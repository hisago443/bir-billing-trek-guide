export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      treks: {
        Row: {
          id: string
          name: string
          description: string | null
          difficulty: string | null
          duration: string | null
          distance: string | null
          start_point: string | null
          end_point: string | null
          route_map: Json | null
          photos: string[] | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          difficulty?: string | null
          duration?: string | null
          distance?: string | null
          start_point?: string | null
          end_point?: string | null
          route_map?: Json | null
          photos?: string[] | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          difficulty?: string | null
          duration?: string | null
          distance?: string | null
          start_point?: string | null
          end_point?: string | null
          route_map?: Json | null
          photos?: string[] | null
          created_at?: string | null
        }
        Relationships: []
      }
      accommodations: {
        Row: {
          id: string
          name: string
          type: string | null
          description: string | null
          location: Json | null
          price_range: string | null
          contact_info: string | null
          photos: string[] | null
          booking_link: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          type?: string | null
          description?: string | null
          location?: Json | null
          price_range?: string | null
          contact_info?: string | null
          photos?: string[] | null
          booking_link?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          type?: string | null
          description?: string | null
          location?: Json | null
          price_range?: string | null
          contact_info?: string | null
          photos?: string[] | null
          booking_link?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      cafes: {
        Row: {
          id: string
          name: string
          description: string | null
          location: Json | null
          contact_info: string | null
          photos: string[] | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          location?: Json | null
          contact_info?: string | null
          photos?: string[] | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          location?: Json | null
          contact_info?: string | null
          photos?: string[] | null
          created_at?: string | null
        }
        Relationships: []
      }
      activities: {
        Row: {
          id: string
          name: string
          description: string | null
          price: string | null
          location: Json | null
          photos: string[] | null
          booking_link: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price?: string | null
          location?: Json | null
          photos?: string[] | null
          booking_link?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: string | null
          location?: Json | null
          photos?: string[] | null
          booking_link?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          id: string
          guest_name: string
          guest_contact: string
          booking_date: string
          status: string | null
          trek_id: string | null
          accommodation_id: string | null
          activity_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          guest_name: string
          guest_contact: string
          booking_date: string
          status?: string | null
          trek_id?: string | null
          accommodation_id?: string | null
          activity_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          guest_name?: string
          guest_contact?: string
          booking_date?: string
          status?: string | null
          trek_id?: string | null
          accommodation_id?: string | null
          activity_id?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_trek_id_fkey"
            columns: ["trek_id"]
            referencedRelation: "treks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_accommodation_id_fkey"
            columns: ["accommodation_id"]
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_activity_id_fkey"
            columns: ["activity_id"]
            referencedRelation: "activities"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
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
