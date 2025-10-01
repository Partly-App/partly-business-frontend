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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      companies: {
        Row: {
          achievementGoals: string[] | null
          adminId: string | null
          createdAt: string
          id: string
          industry: string[]
          name: string
          numberOfEmployees: number
          paddleCustomerId: string | null
        }
        Insert: {
          achievementGoals?: string[] | null
          adminId?: string | null
          createdAt?: string
          id?: string
          industry: string[]
          name: string
          numberOfEmployees: number
          paddleCustomerId?: string | null
        }
        Update: {
          achievementGoals?: string[] | null
          adminId?: string | null
          createdAt?: string
          id?: string
          industry?: string[]
          name?: string
          numberOfEmployees?: number
          paddleCustomerId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_adminId_fkey"
            columns: ["adminId"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      companySubscriptions: {
        Row: {
          companyId: string
          createdAt: string
          id: string
          paddleCustomerId: string
          paddleSubscriptionId: string | null
          periodEnd: string
          periodStart: string
          status: Database["public"]["Enums"]["subscriptionStatus"]
        }
        Insert: {
          companyId: string
          createdAt?: string
          id?: string
          paddleCustomerId: string
          paddleSubscriptionId?: string | null
          periodEnd: string
          periodStart: string
          status: Database["public"]["Enums"]["subscriptionStatus"]
        }
        Update: {
          companyId?: string
          createdAt?: string
          id?: string
          paddleCustomerId?: string
          paddleSubscriptionId?: string | null
          periodEnd?: string
          periodStart?: string
          status?: Database["public"]["Enums"]["subscriptionStatus"]
        }
        Relationships: [
          {
            foreignKeyName: "companySubscriptions_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          companyName: string
          corporateEmail: string
          countOfEmployees: number
          createdAt: string
          id: string
          message: string | null
          name: string
        }
        Insert: {
          companyName: string
          corporateEmail: string
          countOfEmployees: number
          createdAt?: string
          id?: string
          message?: string | null
          name: string
        }
        Update: {
          companyName?: string
          corporateEmail?: string
          countOfEmployees?: number
          createdAt?: string
          id?: string
          message?: string | null
          name?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          conversationType: Database["public"]["Enums"]["conversationType"]
          createdAt: string
          id: string
          userId: string
        }
        Insert: {
          conversationType: Database["public"]["Enums"]["conversationType"]
          createdAt?: string
          id?: string
          userId: string
        }
        Update: {
          conversationType?: Database["public"]["Enums"]["conversationType"]
          createdAt?: string
          id?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          companyId: string
          createdAt: string
          id: string
          name: string
        }
        Insert: {
          companyId: string
          createdAt?: string
          id?: string
          name: string
        }
        Update: {
          companyId?: string
          createdAt?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      departmentScores: {
        Row: {
          createdAt: string
          departmentId: string
          fixSuggestion: string | null
          id: string
          score: number
        }
        Insert: {
          createdAt?: string
          departmentId: string
          fixSuggestion?: string | null
          id?: string
          score?: number
        }
        Update: {
          createdAt?: string
          departmentId?: string
          fixSuggestion?: string | null
          id?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "departmentWellbeingScore_departmentId_fkey"
            columns: ["departmentId"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      departmentSubScores: {
        Row: {
          createdAt: string
          departmentScoreId: string
          id: string
          reason: string | null
          score: number
          type: Database["public"]["Enums"]["journeyTag"]
        }
        Insert: {
          createdAt?: string
          departmentScoreId: string
          id?: string
          reason?: string | null
          score?: number
          type: Database["public"]["Enums"]["journeyTag"]
        }
        Update: {
          createdAt?: string
          departmentScoreId?: string
          id?: string
          reason?: string | null
          score?: number
          type?: Database["public"]["Enums"]["journeyTag"]
        }
        Relationships: [
          {
            foreignKeyName: "departmentSubScores_departmentScoreId_fkey"
            columns: ["departmentScoreId"]
            isOneToOne: false
            referencedRelation: "departmentScores"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          companyId: string
          createdAt: string
          departmentId: string | null
          id: string
          role: string | null
          userId: string
        }
        Insert: {
          companyId: string
          createdAt?: string
          departmentId?: string | null
          id?: string
          role?: string | null
          userId: string
        }
        Update: {
          companyId?: string
          createdAt?: string
          departmentId?: string | null
          id?: string
          role?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_departmentId_fkey"
            columns: ["departmentId"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          createdAt: string
          feedbackType: Database["public"]["Enums"]["feedbackType"]
          id: string
          message: string
          userId: string
        }
        Insert: {
          createdAt?: string
          feedbackType: Database["public"]["Enums"]["feedbackType"]
          id?: string
          message: string
          userId: string
        }
        Update: {
          createdAt?: string
          feedbackType?: Database["public"]["Enums"]["feedbackType"]
          id?: string
          message?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      insights: {
        Row: {
          createdAt: string
          embedding: unknown
          id: string
          momentId: string
          tag: Database["public"]["Enums"]["momentTag"]
          text: string
          title: string
          userId: string
        }
        Insert: {
          createdAt?: string
          embedding: unknown
          id?: string
          momentId: string
          tag: Database["public"]["Enums"]["momentTag"]
          text: string
          title: string
          userId: string
        }
        Update: {
          createdAt?: string
          embedding?: unknown
          id?: string
          momentId?: string
          tag?: Database["public"]["Enums"]["momentTag"]
          text?: string
          title?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "insights_momentId_fkey"
            columns: ["momentId"]
            isOneToOne: false
            referencedRelation: "moments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insights_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invites: {
        Row: {
          companyId: string
          createdAt: string
          departmentId: string | null
          email: string
          id: string
          role: string | null
        }
        Insert: {
          companyId: string
          createdAt?: string
          departmentId?: string | null
          email: string
          id?: string
          role?: string | null
        }
        Update: {
          companyId?: string
          createdAt?: string
          departmentId?: string | null
          email?: string
          id?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invites_companyId_fkey"
            columns: ["companyId"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      journeys: {
        Row: {
          createdAt: string
          id: string
          journeyTag: Database["public"]["Enums"]["journeyTag"]
          numOfUsers: number
        }
        Insert: {
          createdAt?: string
          id?: string
          journeyTag: Database["public"]["Enums"]["journeyTag"]
          numOfUsers?: number
        }
        Update: {
          createdAt?: string
          id?: string
          journeyTag?: Database["public"]["Enums"]["journeyTag"]
          numOfUsers?: number
        }
        Relationships: []
      }
      messages: {
        Row: {
          conversationId: string
          createdAt: string
          embedding: unknown | null
          id: string
          message: string
          sender: Database["public"]["Enums"]["messageSender"]
        }
        Insert: {
          conversationId: string
          createdAt?: string
          embedding?: unknown | null
          id?: string
          message: string
          sender: Database["public"]["Enums"]["messageSender"]
        }
        Update: {
          conversationId?: string
          createdAt?: string
          embedding?: unknown | null
          id?: string
          message?: string
          sender?: Database["public"]["Enums"]["messageSender"]
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversationId_fkey"
            columns: ["conversationId"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      moments: {
        Row: {
          coverSrc: string
          createdAt: string
          description: string
          id: string
          orderIndex: number
          pathId: string
          tag: Database["public"]["Enums"]["momentTag"]
          title: string
        }
        Insert: {
          coverSrc: string
          createdAt?: string
          description: string
          id?: string
          orderIndex: number
          pathId: string
          tag: Database["public"]["Enums"]["momentTag"]
          title: string
        }
        Update: {
          coverSrc?: string
          createdAt?: string
          description?: string
          id?: string
          orderIndex?: number
          pathId?: string
          tag?: Database["public"]["Enums"]["momentTag"]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "moments_path_fkey"
            columns: ["pathId"]
            isOneToOne: false
            referencedRelation: "paths"
            referencedColumns: ["id"]
          },
        ]
      }
      noteFromSelf: {
        Row: {
          createdAt: string
          id: string
          text: string
          title: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: string
          text: string
          title: string
          userId: string
        }
        Update: {
          createdAt?: string
          id?: string
          text?: string
          title?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "noteFromSelf_userId_fkey"
            columns: ["userId"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          color: Database["public"]["Enums"]["noteColors"]
          createdAt: string
          embedding: unknown | null
          id: string
          isPinned: boolean
          note: string
          stepId: string | null
          title: string
          userId: string
        }
        Insert: {
          color?: Database["public"]["Enums"]["noteColors"]
          createdAt?: string
          embedding?: unknown | null
          id?: string
          isPinned?: boolean
          note: string
          stepId?: string | null
          title: string
          userId: string
        }
        Update: {
          color?: Database["public"]["Enums"]["noteColors"]
          createdAt?: string
          embedding?: unknown | null
          id?: string
          isPinned?: boolean
          note?: string
          stepId?: string | null
          title?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_stepId_fkey"
            columns: ["stepId"]
            isOneToOne: false
            referencedRelation: "steps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partStats: {
        Row: {
          createdAt: string
          id: string
          momentsCompleted: number
          part: Database["public"]["Enums"]["parts"]
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: string
          momentsCompleted?: number
          part: Database["public"]["Enums"]["parts"]
          userId: string
        }
        Update: {
          createdAt?: string
          id?: string
          momentsCompleted?: number
          part?: Database["public"]["Enums"]["parts"]
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "partProgress_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      paths: {
        Row: {
          createdAt: string
          description: string
          id: string
          journeyId: string | null
          orderIndex: number
          title: string
        }
        Insert: {
          createdAt?: string
          description: string
          id?: string
          journeyId?: string | null
          orderIndex: number
          title: string
        }
        Update: {
          createdAt?: string
          description?: string
          id?: string
          journeyId?: string | null
          orderIndex?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "paths_journeyId_fkey"
            columns: ["journeyId"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatarUrl: string | null
          currentStreak: number
          email: string | null
          fullName: string | null
          hasPassedPathZero: boolean
          id: string
          lastActiveDate: string
          longestStreak: number
        }
        Insert: {
          avatarUrl?: string | null
          currentStreak?: number
          email?: string | null
          fullName?: string | null
          hasPassedPathZero?: boolean
          id: string
          lastActiveDate?: string
          longestStreak?: number
        }
        Update: {
          avatarUrl?: string | null
          currentStreak?: number
          email?: string | null
          fullName?: string | null
          hasPassedPathZero?: boolean
          id?: string
          lastActiveDate?: string
          longestStreak?: number
        }
        Relationships: []
      }
      progress: {
        Row: {
          answers: Json | null
          createdAt: string
          currentStepIndex: number | null
          id: string
          journeyId: string | null
          momentId: string | null
          pathId: string | null
          status: Database["public"]["Enums"]["progressStatus"]
          userId: string
        }
        Insert: {
          answers?: Json | null
          createdAt?: string
          currentStepIndex?: number | null
          id?: string
          journeyId?: string | null
          momentId?: string | null
          pathId?: string | null
          status: Database["public"]["Enums"]["progressStatus"]
          userId: string
        }
        Update: {
          answers?: Json | null
          createdAt?: string
          currentStepIndex?: number | null
          id?: string
          journeyId?: string | null
          momentId?: string | null
          pathId?: string | null
          status?: Database["public"]["Enums"]["progressStatus"]
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "progress_journeyId_fkey"
            columns: ["journeyId"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_momentId_fkey"
            columns: ["momentId"]
            isOneToOne: false
            referencedRelation: "moments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_pathId_fkey"
            columns: ["pathId"]
            isOneToOne: false
            referencedRelation: "paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      scores: {
        Row: {
          createdAt: string
          fixSuggestion: string | null
          id: string
          score: number
          userId: string
        }
        Insert: {
          createdAt?: string
          fixSuggestion?: string | null
          id?: string
          score?: number
          userId: string
        }
        Update: {
          createdAt?: string
          fixSuggestion?: string | null
          id?: string
          score?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "wellbeingScore_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      steps: {
        Row: {
          createdAt: string
          id: string
          momentId: string
          orderIndex: number
          payload: Json
          type: Database["public"]["Enums"]["stepType"]
        }
        Insert: {
          createdAt?: string
          id?: string
          momentId: string
          orderIndex: number
          payload: Json
          type: Database["public"]["Enums"]["stepType"]
        }
        Update: {
          createdAt?: string
          id?: string
          momentId?: string
          orderIndex?: number
          payload?: Json
          type?: Database["public"]["Enums"]["stepType"]
        }
        Relationships: [
          {
            foreignKeyName: "steps_momentId_fkey"
            columns: ["momentId"]
            isOneToOne: false
            referencedRelation: "moments"
            referencedColumns: ["id"]
          },
        ]
      }
      subScores: {
        Row: {
          createdAt: string
          id: string
          reason: string | null
          score: number
          scoreId: string
          type: Database["public"]["Enums"]["journeyTag"]
        }
        Insert: {
          createdAt?: string
          id?: string
          reason?: string | null
          score?: number
          scoreId: string
          type: Database["public"]["Enums"]["journeyTag"]
        }
        Update: {
          createdAt?: string
          id?: string
          reason?: string | null
          score?: number
          scoreId?: string
          type?: Database["public"]["Enums"]["journeyTag"]
        }
        Relationships: [
          {
            foreignKeyName: "subScores_scoreId_fkey"
            columns: ["scoreId"]
            isOneToOne: false
            referencedRelation: "scores"
            referencedColumns: ["id"]
          },
        ]
      }
      userMomentAnswers: {
        Row: {
          answerText: string
          createdAt: string
          embedding: unknown
          id: string
          momentId: string
          stepId: string
          stepPrompt: string
          userId: string
        }
        Insert: {
          answerText: string
          createdAt?: string
          embedding: unknown
          id?: string
          momentId: string
          stepId: string
          stepPrompt: string
          userId: string
        }
        Update: {
          answerText?: string
          createdAt?: string
          embedding?: unknown
          id?: string
          momentId?: string
          stepId?: string
          stepPrompt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "userMomentAnswers_momentId_fkey"
            columns: ["momentId"]
            isOneToOne: false
            referencedRelation: "moments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userMomentAnswers_stepId_fkey"
            columns: ["stepId"]
            isOneToOne: false
            referencedRelation: "steps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userMomentAnswers_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      getMomentCounts: {
        Args: Record<PropertyKey, never>
        Returns: {
          count: number
          tag: Database["public"]["Enums"]["momentTag"]
        }[]
      }
      matchMessages: {
        Args: {
          matchCount?: number
          matchThreshold?: number
          queryEmbedding: string
        }
        Returns: {
          message: string
        }[]
      }
      matchUserMomentAnswers: {
        Args: {
          matchCount?: number
          matchThreshold?: number
          queryEmbedding: string
        }
        Returns: {
          answerText: string
          stepPrompt: string
        }[]
      }
      matchUserNotes: {
        Args: {
          matchCount?: number
          matchThreshold?: number
          queryEmbedding: string
        }
        Returns: {
          note: string
          title: string
        }[]
      }
    }
    Enums: {
      conversationType: "partly" | "self" | "manager" | "exile" | "firefighter"
      conversationTyped:
        | "self"
        | "manager"
        | "exile"
        | "firefighter"
        | "vent"
        | "partly"
      feedbackType: "conversation"
      insightType:
        | "self"
        | "manager"
        | "firefighter"
        | "exile"
        | "noteFromSelf"
        | "mixed"
      journeyTag: "anger" | "anxiety" | "confidence" | "shame"
      messageSender:
        | "user"
        | "self"
        | "exile"
        | "manager"
        | "firefighter"
        | "partly"
      momentTag:
        | "exile"
        | "manager"
        | "firefighter"
        | "self"
        | "regular"
        | "reflection"
      noteColors:
        | "yellow"
        | "white"
        | "purple"
        | "grey"
        | "green"
        | "red"
        | "blue"
      parts: "self" | "manager" | "firefighter" | "exile"
      progressStatus: "inProgress" | "completed" | "unlocked"
      stepType:
        | "titleFade"
        | "cardSwipe"
        | "plainText"
        | "image"
        | "breather"
        | "input"
        | "quote"
        | "answerReveal"
        | "showcaseChat"
        | "choice"
        | "endGain"
      subscriptionStatus: "active" | "inactive" | "trialing"
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
    Enums: {
      conversationType: ["partly", "self", "manager", "exile", "firefighter"],
      conversationTyped: [
        "self",
        "manager",
        "exile",
        "firefighter",
        "vent",
        "partly",
      ],
      feedbackType: ["conversation"],
      insightType: [
        "self",
        "manager",
        "firefighter",
        "exile",
        "noteFromSelf",
        "mixed",
      ],
      journeyTag: ["anger", "anxiety", "confidence", "shame"],
      messageSender: [
        "user",
        "self",
        "exile",
        "manager",
        "firefighter",
        "partly",
      ],
      momentTag: [
        "exile",
        "manager",
        "firefighter",
        "self",
        "regular",
        "reflection",
      ],
      noteColors: ["yellow", "white", "purple", "grey", "green", "red", "blue"],
      parts: ["self", "manager", "firefighter", "exile"],
      progressStatus: ["inProgress", "completed", "unlocked"],
      stepType: [
        "titleFade",
        "cardSwipe",
        "plainText",
        "image",
        "breather",
        "input",
        "quote",
        "answerReveal",
        "showcaseChat",
        "choice",
        "endGain",
      ],
      subscriptionStatus: ["active", "inactive", "trialing"],
    },
  },
} as const
