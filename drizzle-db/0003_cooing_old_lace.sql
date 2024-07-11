CREATE TABLE IF NOT EXISTS "access_tokens" (
	"id" varchar PRIMARY KEY NOT NULL,
	"sub" varchar NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "refresh_tokens" (
	"id" varchar PRIMARY KEY NOT NULL,
	"access_token_id" varchar NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
