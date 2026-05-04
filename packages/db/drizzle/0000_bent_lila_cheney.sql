CREATE TABLE IF NOT EXISTS "politicians" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"party" text NOT NULL,
	"jurisdiction" text NOT NULL,
	"office" text NOT NULL,
	"summary" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
