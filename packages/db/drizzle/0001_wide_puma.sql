CREATE TABLE IF NOT EXISTS "accountability_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"politician_id" integer NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"date" date NOT NULL,
	"description" text NOT NULL,
	"source_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accountability_events" ADD CONSTRAINT "accountability_events_politician_id_politicians_id_fk" FOREIGN KEY ("politician_id") REFERENCES "politicians"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
