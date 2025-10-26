export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      accommodations: {
        Row: {
          amenities: string[] | null
          created_at: string | null
          description: string | null
          email: string | null
          id: number
          image: string | null
          location: string | null
          name: string
          phone: string | null
          photos: string[] | null
          price: string | null
          price_range: string | null
          rating: number | null
          tags: string[] | null
          type: string | null
          website: string | null
        }
        Insert: {
          amenities?: string[] | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: never
          image?: string | null
          location?: string | null
          name: string
          phone?: string | null
          photos?: string[] | null
          price?: string | null
          price_range?: string | null
          rating?: number | null
          tags?: string[] | null
          type?: string | null
          website?: string | null
        }
        Update: {
          amenities?: string[] | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: never
          image?: string | null
          location?: string | null
          name?: string
          phone?: string | null
          photos?: string[] | null
          price?: string | null
          price_range?: string | null
          rating?: number | null
          tags?: string[] | null
          type?: string | null
          website?: string | null
        }
        Relationships: []
      }
      activities: {
        Row: {
          booking_link: string | null
          created_at: string | null
          description: string | null
          id: string
          location: Json | null
          name: string
          photos: string[] | null
          price: string | null
        }
        Insert: {
          booking_link?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: Json | null
          name: string
          photos?: string[] | null
          price?: string | null
        }
        Update: {
          booking_link?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: Json | null
          name?: string
          photos?: string[] | null
          price?: string | null
        }
        Relationships: []
      }
      articles: {
        Row: {
          author: string | null
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          published_at: string | null
          slug: string
          title: string
        }
        Insert: {
          author?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug: string
          title: string
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          accommodation_id: string | null
          activity_id: string | null
          booking_date: string
          created_at: string | null
          guest_contact: string
          guest_name: string
          id: string
          status: string | null
          trek_id: string | null
        }
        Insert: {
          accommodation_id?: string | null
          activity_id?: string | null
          booking_date: string
          created_at?: string | null
          guest_contact: string
          guest_name: string
          id?: string
          status?: string | null
          trek_id?: string | null
        }
        Update: {
          accommodation_id?: string | null
          activity_id?: string | null
          booking_date?: string
          created_at?: string | null
          guest_contact?: string
          guest_name?: string
          id?: string
          status?: string | null
          trek_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_trek_id_fkey"
            columns: ["trek_id"]
            isOneToOne: false
            referencedRelation: "treks"
            referencedColumns: ["id"]
          },
        ]
      }
      cafes: {
        Row: {
          created_at: string | null
          cuisine: string[] | null
          description: string | null
          hours: string | null
          id: number
          image: string | null
          instagram: string | null
          location: string | null
          menu_highlights: string[] | null
          name: string
          phone: string | null
          photos: string[] | null
          price: string | null
          rating: number | null
          specialties: string[] | null
          vibe: string | null
        }
        Insert: {
          created_at?: string | null
          cuisine?: string[] | null
          description?: string | null
          hours?: string | null
          id?: never
          image?: string | null
          instagram?: string | null
          location?: string | null
          menu_highlights?: string[] | null
          name: string
          phone?: string | null
          photos?: string[] | null
          price?: string | null
          rating?: number | null
          specialties?: string[] | null
          vibe?: string | null
        }
        Update: {
          created_at?: string | null
          cuisine?: string[] | null
          description?: string | null
          hours?: string | null
          id?: never
          image?: string | null
          instagram?: string | null
          location?: string | null
          menu_highlights?: string[] | null
          name?: string
          phone?: string | null
          photos?: string[] | null
          price?: string | null
          rating?: number | null
          specialties?: string[] | null
          vibe?: string | null
        }
        Relationships: []
      }
      destinations: {
        Row: {
          activities: string[] | null
          best_time_to_visit: string | null
          created_at: string | null
          description: string | null
          full_article: string | null
          gallery_images: string[] | null
          hero_image: string | null
          how_to_reach: string | null
          id: string
          location: Json | null
          name: string
          nearby_attractions: string[] | null
          slug: string
          tagline: string | null
          updated_at: string | null
        }
        Insert: {
          activities?: string[] | null
          best_time_to_visit?: string | null
          created_at?: string | null
          description?: string | null
          full_article?: string | null
          gallery_images?: string[] | null
          hero_image?: string | null
          how_to_reach?: string | null
          id?: string
          location?: Json | null
          name: string
          nearby_attractions?: string[] | null
          slug: string
          tagline?: string | null
          updated_at?: string | null
        }
        Update: {
          activities?: string[] | null
          best_time_to_visit?: string | null
          created_at?: string | null
          description?: string | null
          full_article?: string | null
          gallery_images?: string[] | null
          hero_image?: string | null
          how_to_reach?: string | null
          id?: string
          location?: Json | null
          name?: string
          nearby_attractions?: string[] | null
          slug?: string
          tagline?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      taxi_services: {
        Row: {
          areas_covered: string[] | null
          contact_number: string
          created_at: string | null
          driver_name: string
          id: string
          languages_spoken: string[] | null
          price_range: string | null
          rating: number | null
          seating_capacity: number | null
          vehicle_type: string | null
          whatsapp_number: string | null
        }
        Insert: {
          areas_covered?: string[] | null
          contact_number: string
          created_at?: string | null
          driver_name: string
          id?: string
          languages_spoken?: string[] | null
          price_range?: string | null
          rating?: number | null
          seating_capacity?: number | null
          vehicle_type?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          areas_covered?: string[] | null
          contact_number?: string
          created_at?: string | null
          driver_name?: string
          id?: string
          languages_spoken?: string[] | null
          price_range?: string | null
          rating?: number | null
          seating_capacity?: number | null
          vehicle_type?: string | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      treks: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty: string | null
          distance: string | null
          duration: string | null
          end_point: string | null
          id: string
          name: string
          photos: string[] | null
          route_map: Json | null
          start_point: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          distance?: string | null
          duration?: string | null
          end_point?: string | null
          id?: string
          name: string
          photos?: string[] | null
          route_map?: Json | null
          start_point?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          distance?: string | null
          duration?: string | null
          end_point?: string | null
          id?: string
          name?: string
          photos?: string[] | null
          route_map?: Json | null
          start_point?: string | null
        }
        Relationships: []
      }
      vehicle_rentals: {
        Row: {
          available_vehicles: number | null
          contact_number: string
          created_at: string | null
          features: string[] | null
          id: string
          location: string | null
          price_per_day: string | null
          provider_name: string
          vehicle_model: string | null
          vehicle_type: string
          whatsapp_number: string | null
        }
        Insert: {
          available_vehicles?: number | null
          contact_number: string
          created_at?: string | null
          features?: string[] | null
          id?: string
          location?: string | null
          price_per_day?: string | null
          provider_name: string
          vehicle_model?: string | null
          vehicle_type: string
          whatsapp_number?: string | null
        }
        Update: {
          available_vehicles?: number | null
          contact_number?: string
          created_at?: string | null
          features?: string[] | null
          id?: string
          location?: string | null
          price_per_day?: string | null
          provider_name?: string
          vehicle_model?: string | null
          vehicle_type?: string
          whatsapp_number?: string | null
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
