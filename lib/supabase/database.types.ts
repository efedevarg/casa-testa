export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          short_description: string;
          price: number;
          compare_at_price: number | null;
          sku: string;
          stock: number;
          featured: boolean;
          category_id: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description: string;
          short_description: string;
          price: number;
          compare_at_price?: number | null;
          sku: string;
          stock?: number;
          featured?: boolean;
          category_id: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          short_description?: string;
          price?: number;
          compare_at_price?: number | null;
          sku?: string;
          stock?: number;
          featured?: boolean;
          category_id?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          image_url: string;
          alt_text: string;
          sort_order: number;
        };
        Insert: {
          id?: string;
          product_id: string;
          image_url: string;
          alt_text: string;
          sort_order?: number;
        };
        Update: {
          id?: string;
          product_id?: string;
          image_url?: string;
          alt_text?: string;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      pizzella_molds: {
        Row: {
          id: string;
          model_name: string;
          slug: string;
          description: string;
          dimensions: string | null;
          material: string | null;
          price: number | null;
          featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          model_name: string;
          slug: string;
          description: string;
          dimensions?: string | null;
          material?: string | null;
          price?: number | null;
          featured?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          model_name?: string;
          slug?: string;
          description?: string;
          dimensions?: string | null;
          material?: string | null;
          price?: number | null;
          featured?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      pizzella_images: {
        Row: {
          id: string;
          mold_id: string;
          image_url: string;
          alt_text: string;
        };
        Insert: {
          id?: string;
          mold_id: string;
          image_url: string;
          alt_text: string;
        };
        Update: {
          id?: string;
          mold_id?: string;
          image_url?: string;
          alt_text?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pizzella_images_mold_id_fkey";
            columns: ["mold_id"];
            isOneToOne: false;
            referencedRelation: "pizzella_molds";
            referencedColumns: ["id"];
          },
        ];
      };
      repair_services: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          featured: boolean;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          featured?: boolean;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          featured?: boolean;
        };
        Relationships: [];
      };
      contact_inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          topic: string;
          message: string;
          status: "nueva" | "respondida" | "archivada";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          topic: string;
          message: string;
          status?: "nueva" | "respondida" | "archivada";
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          topic?: string;
          message?: string;
          status?: "nueva" | "respondida" | "archivada";
          created_at?: string;
        };
        Relationships: [];
      };
      site_content: {
        Row: {
          id: string;
          key: string;
          value: string;
          description: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value?: string;
          description?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: string;
          description?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      repair_inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          piece_description: string;
          message: string;
          status: "nueva" | "respondida" | "archivada";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          piece_description: string;
          message: string;
          status?: "nueva" | "respondida" | "archivada";
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          piece_description?: string;
          message?: string;
          status?: "nueva" | "respondida" | "archivada";
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type ProductWithRelations = Tables<"products"> & {
  categories: Pick<Tables<"categories">, "slug" | "name"> | null;
  product_images: Tables<"product_images">[];
};

export type PizzellaMoldWithImages = Tables<"pizzella_molds"> & {
  pizzella_images: Tables<"pizzella_images">[];
};
