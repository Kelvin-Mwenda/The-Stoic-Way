import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  ScrollArea
} from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { CalendarIcon, EditIcon, Plus, Save, Trash } from "lucide-react";

interface JournalEntry {
  id: string;
  entry_date: string;
  gratitude_notes: string | null;
  reflection_notes: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  user_id: string | null;
}

const Journal = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [today, setToday] = useState('');
  
  // New entry form state
  const [gratitudeNotes, setGratitudeNotes] = useState("");
  const [reflectionNotes, setReflectionNotes] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  // Set today's date in YYYY-MM-DD format
  useEffect(() => {
    const now = new Date();
    setToday(format(now, 'yyyy-MM-dd'));
  }, []);

  // Fetch journal entries
  useEffect(() => {
    const fetchEntries = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("StoicJournal")
          .select("*")
          .eq("user_id", user.id)
          .order("entry_date", { ascending: false });

        if (error) {
          console.error("Error fetching journal entries:", error);
          return;
        }

        // Convert timestamps to Date objects and specify the type
        const entries: JournalEntry[] = data.map((entry: {
          created_at: string | null;
          entry_date: string;
          gratitude_notes: string | null;
          id: string;
          reflection_notes: string | null;
          updated_at: string | null;
          user_id: string | null;
        }) => ({
          ...entry,
          created_at: entry.created_at ? new Date(entry.created_at) : null,
          updated_at: entry.updated_at ? new Date(entry.updated_at) : null,
        }));

        setEntries(entries);
        
        // Check if there's an entry for today
        const todayEntry = data?.find(entry => entry.entry_date === today);
        if (todayEntry) {
          setGratitudeNotes(todayEntry.gratitude_notes || "");
          setReflectionNotes(todayEntry.reflection_notes || "");
        }
      } catch (error) {
        console.error("Error in fetchEntries:", error);
      }
    };

    if (user && today) {
      fetchEntries();
    }
  }, [user, today]);
  
  const saveTodayEntry = async () => {
    if (!user || !today) return;
    
    setIsSubmitting(true);
    
    try {
      // Check if there's already an entry for today
      const todayEntry = entries.find(entry => entry.entry_date === today);
      
      if (todayEntry) {
        // Update existing entry
        const { error } = await supabase
          .from("StoicJournal")
          .update({
            gratitude_notes: gratitudeNotes,
            reflection_notes: reflectionNotes,
            updated_at: new Date().toISOString(),
          })
          .eq("id", todayEntry.id);
          
        if (error) throw error;
        
        // Update local state
        setEntries(entries.map(entry => 
          entry.id === todayEntry.id 
            ? {
                ...entry,
                gratitude_notes: gratitudeNotes,
                reflection_notes: reflectionNotes,
                updated_at: new Date(),
              }
            : entry
        ));
        
        toast({
          title: "Journal updated",
          description: "Your journal entry has been updated."
        });
      } else {
        // Create new entry
        const { data, error } = await supabase
          .from("StoicJournal")
          .insert({
            user_id: user.id,
            entry_date: today,
            gratitude_notes: gratitudeNotes,
            reflection_notes: reflectionNotes,
          })
          .select()
          .single();
          
        if (error) throw error;

        // Ensure the new entry conforms to the JournalEntry type
        const newEntry: JournalEntry = {
          ...data,
          created_at: data.created_at ? new Date(data.created_at) : null,
          updated_at: data.updated_at ? new Date(data.updated_at) : null,
        };
        
        // Update local state
        setEntries([newEntry, ...entries]);
        
        toast({
          title: "Journal saved",
          description: "Your journal entry has been saved."
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error saving journal entry:", error);
        toast({
          title: "Error",
          description: error.message || "An error occurred while sending your message. Please try again.",
          variant: "destructive",
        });
      } else {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSelectEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setIsEditing(false);
  };
  
  const handleEditEntry = () => {
    if (!selectedEntry) return;
    
    setGratitudeNotes(selectedEntry.gratitude_notes || "");
    setReflectionNotes(selectedEntry.reflection_notes || "");
    setIsEditing(true);
  };
  
  const handleSaveEdit = async () => {
    if (!selectedEntry || !user) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("StoicJournal")
        .update({
          gratitude_notes: gratitudeNotes,
          reflection_notes: reflectionNotes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedEntry.id);
        
      if (error) throw error;
      
      // Update local state
      const updatedEntry = {
        ...selectedEntry,
        gratitude_notes: gratitudeNotes,
        reflection_notes: reflectionNotes,
        updated_at: new Date(),
      };
      
      setEntries(entries.map(entry => 
        entry.id === selectedEntry.id ? updatedEntry : entry
      ));
      
      setSelectedEntry(updatedEntry);
      setIsEditing(false);
      
      toast({
        title: "Entry updated",
        description: "Your journal entry has been updated."
      });
    } catch (error) {
      
      if (error instanceof Error) {
        console.error("Error updating journal entry:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to delete journal entry",
          variant: "destructive",
        });
      } else {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteEntry = async () => {
    if (!selectedEntry || !user) return;
    
    if (!window.confirm("Are you sure you want to delete this journal entry? This action cannot be undone.")) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("StoicJournal")
        .delete()
        .eq("id", selectedEntry.id);
        
      if (error) throw error;
      
      // Update local state
      setEntries(entries.filter(entry => entry.id !== selectedEntry.id));
      setSelectedEntry(null);
      
      toast({
        title: "Entry deleted",
        description: "Your journal entry has been deleted."
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting journal entry:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to delete journal entry",
          variant: "destructive",
        });
      } else {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-6">
          <div className="flex justify-center">
            <p>Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-6">Stoic Journal</h1>
        <p className="text-muted-foreground mb-8">
          Record your daily reflections and practice gratitude in your Stoic journal.
        </p>
        
        <Tabs defaultValue="today" className="w-full">
          <TabsList>
            <TabsTrigger value="today">Today's Entry</TabsTrigger>
            <TabsTrigger value="history">Journal History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  Today's Journal
                </CardTitle>
                <CardDescription>
                  Record your reflections and gratitude for {format(new Date(today), 'MMMM d, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">What are you grateful for today?</h3>
                  <Textarea
                    value={gratitudeNotes}
                    onChange={(e) => setGratitudeNotes(e.target.value)}
                    placeholder="List 3-5 things you're grateful for..."
                    rows={5}
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Stoic Reflection</h3>
                  <Textarea
                    value={reflectionNotes}
                    onChange={(e) => setReflectionNotes(e.target.value)}
                    placeholder="Reflect on your day through a Stoic lens. What went well? What could you improve? What is within your control?"
                    rows={8}
                    disabled={isSubmitting}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={saveTodayEntry} 
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Saving..." : "Save Journal Entry"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Journal Entries</CardTitle>
                    <CardDescription>
                      Browse your past journal entries
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {entries.length === 0 ? (
                      <p className="text-muted-foreground">No journal entries yet.</p>
                    ) : (
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-2">
                          {entries.map((entry) => (
                            <Button
                              key={entry.id}
                              variant={selectedEntry?.id === entry.id ? "default" : "outline"}
                              className="w-full justify-start text-left"
                              onClick={() => handleSelectEntry(entry)}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {format(new Date(entry.entry_date), 'MMM d, yyyy')}
                            </Button>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedEntry(null);
                        navigate('/journal');
                      }}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      New Entry
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                {selectedEntry ? (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle>
                          {format(new Date(selectedEntry.entry_date), 'MMMM d, yyyy')}
                        </CardTitle>
                        <CardDescription>
                          Last updated: {selectedEntry.updated_at ? format(new Date(selectedEntry.updated_at), 'MMM d, yyyy h:mm a') : 'Never'}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        {isEditing ? (
                          <Button
                            size="sm"
                            onClick={handleSaveEdit}
                            disabled={isSubmitting}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleEditEntry}
                          >
                            <EditIcon className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={handleDeleteEntry}
                          disabled={isSubmitting}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      {isEditing ? (
                        <>
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">Gratitude</h3>
                            <Textarea
                              value={gratitudeNotes}
                              onChange={(e) => setGratitudeNotes(e.target.value)}
                              rows={5}
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">Reflection</h3>
                            <Textarea
                              value={reflectionNotes}
                              onChange={(e) => setReflectionNotes(e.target.value)}
                              rows={8}
                              disabled={isSubmitting}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">Gratitude</h3>
                            <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
                              {selectedEntry.gratitude_notes || <em>No gratitude notes recorded</em>}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">Reflection</h3>
                            <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
                              {selectedEntry.reflection_notes || <em>No reflection notes recorded</em>}
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center h-full py-24">
                      <p className="text-muted-foreground mb-4 text-center">
                        Select a journal entry from the list or create a new entry.
                      </p>
                      <Button 
                        onClick={() => navigate('/journal')}
                      >
                        Create Today's Entry
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Journal;
