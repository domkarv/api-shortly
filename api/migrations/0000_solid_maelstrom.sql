CREATE TABLE IF NOT EXISTS "analytics" (
	"id" serial NOT NULL,
	"uri_id" text NOT NULL,
	"visited_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "analytics_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "uri" (
	"id" serial NOT NULL,
	"short_url_id" text NOT NULL,
	"main_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "uri_id_unique" UNIQUE("id"),
	CONSTRAINT "uri_short_url_id_unique" UNIQUE("short_url_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics" ADD CONSTRAINT "analytics_uri_id_uri_short_url_id_fk" FOREIGN KEY ("uri_id") REFERENCES "public"."uri"("short_url_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
