export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      document_submissions: {
        Row: {
          document_type: string
          employee_email: string
          file_name: string
          file_url: string | null
          id: string
          status: string
          submitted_at: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          document_type: string
          employee_email: string
          file_name: string
          file_url?: string | null
          id?: string
          status?: string
          submitted_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          document_type?: string
          employee_email?: string
          file_name?: string
          file_url?: string | null
          id?: string
          status?: string
          submitted_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_submissions_employee_email_fkey"
            columns: ["employee_email"]
            isOneToOne: false
            referencedRelation: "employee_accounts"
            referencedColumns: ["email"]
          },
        ]
      }
      employee_accounts: {
        Row: {
          created_at: string
          created_by: string
          department: string
          email: string
          id: string
          manager: string | null
          name: string
          phone: string | null
          position: string
          start_date: string
          work_location: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          department: string
          email: string
          id?: string
          manager?: string | null
          name: string
          phone?: string | null
          position: string
          start_date: string
          work_location?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          department?: string
          email?: string
          id?: string
          manager?: string | null
          name?: string
          phone?: string | null
          position?: string
          start_date?: string
          work_location?: string | null
        }
        Relationships: []
      }
      employee_profiles: {
        Row: {
          employee_email: string
          id: string
          profile_picture_url: string | null
          updated_at: string
        }
        Insert: {
          employee_email: string
          id?: string
          profile_picture_url?: string | null
          updated_at?: string
        }
        Update: {
          employee_email?: string
          id?: string
          profile_picture_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_profiles_employee_email_fkey"
            columns: ["employee_email"]
            isOneToOne: true
            referencedRelation: "employee_accounts"
            referencedColumns: ["email"]
          },
        ]
      }
      training_progress: {
        Row: {
          completed_at: string | null
          employee_email: string
          id: string
          module_name: string
          status: string
        }
        Insert: {
          completed_at?: string | null
          employee_email: string
          id?: string
          module_name: string
          status?: string
        }
        Update: {
          completed_at?: string | null
          employee_email?: string
          id?: string
          module_name?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_progress_employee_email_fkey"
            columns: ["employee_email"]
            isOneToOne: false
            referencedRelation: "employee_accounts"
            referencedColumns: ["email"]
          },
        ]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
