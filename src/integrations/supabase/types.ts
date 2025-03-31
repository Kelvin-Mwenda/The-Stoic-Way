export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ContactMessages: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_read: boolean | null
          message: string | null
          name: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          name?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          name?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      NewsletterSubs: {
        Row: {
          email: string | null
          id: string
          is_active: boolean | null
          subscribed_at: string
        }
        Insert: {
          email?: string | null
          id?: string
          is_active?: boolean | null
          subscribed_at?: string
        }
        Update: {
          email?: string | null
          id?: string
          is_active?: boolean | null
          subscribed_at?: string
        }
        Relationships: []
      }
      StoicJournal: {
        Row: {
          created_at: string
          entry_date: string
          gratitude_notes: string | null
          id: string
          reflection_notes: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          entry_date: string
          gratitude_notes?: string | null
          id?: string
          reflection_notes?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          entry_date?: string
          gratitude_notes?: string | null
          id?: string
          reflection_notes?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "StoicJournal_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "UserTable"
            referencedColumns: ["id"]
          },
        ]
      }
      StoicPractices: {
        Row: {
          content: string | null
          created_at: string
          description: string | null
          difficulty_level: string | null
          duration_minutes: number | null
          id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          duration_minutes?: number | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          duration_minutes?: number | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      UserProfile: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "UserProfileTable_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "UserTable"
            referencedColumns: ["id"]
          },
        ]
      }
      UserProgress: {
        Row: {
          completion_date: string | null
          created_at: string
          id: string
          notes: string | null
          practice_id: string | null
          user_id: string | null
        }
        Insert: {
          completion_date?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          practice_id?: string | null
          user_id?: string | null
        }
        Update: {
          completion_date?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          practice_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "UserProgress_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "StoicPractices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserProgress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "UserProfile"
            referencedColumns: ["id"]
          },
        ]
      }
      UserTable: {
        Row: {
          created_at: string
          email: string | null
          id: string
          last_sign_in: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          last_sign_in?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          last_sign_in?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
