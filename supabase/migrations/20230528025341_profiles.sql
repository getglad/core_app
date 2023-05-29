CREATE TRIGGER on_auth_user_created
AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE TABLE "public"."profiles" (
  "id" uuid NOT NULL,
  "updated_at" timestamp WITH time zone,
  "username" text,
  "full_name" text,
  "avatar_url" text,
  "website" text
);

ALTER TABLE "public"."profiles" enable ROW LEVEL SECURITY;

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

ALTER TABLE "public"."profiles"
ADD CONSTRAINT "profiles_pkey" PRIMARY KEY USING INDEX "profiles_pkey";

ALTER TABLE "public"."profiles"
ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE NOT valid;

ALTER TABLE "public"."profiles" validate CONSTRAINT "profiles_id_fkey";

ALTER TABLE "public"."profiles"
ADD CONSTRAINT "profiles_username_key" UNIQUE USING INDEX "profiles_username_key";

ALTER TABLE "public"."profiles"
ADD CONSTRAINT "username_length" CHECK ((char_length(username) >= 3)) NOT valid;

ALTER TABLE "public"."profiles" validate CONSTRAINT "username_length";

SET check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $function$ BEGIN
INSERT INTO public.profiles (id, full_name, avatar_url)
VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );

RETURN new;

END;

$function$;

CREATE policy "Public profiles are viewable by everyone." ON "public"."profiles" AS permissive FOR
SELECT TO public USING (TRUE);

CREATE policy "Users can insert their own profile." ON "public"."profiles" AS permissive FOR
INSERT TO public WITH CHECK ((auth.uid() = id));

CREATE policy "Users can update own profile." ON "public"."profiles" AS permissive FOR
UPDATE TO public USING ((auth.uid() = id));

CREATE policy "Anyone can upload an avatar." ON "storage"."objects" AS permissive FOR
INSERT TO public WITH CHECK ((bucket_id = 'avatars'::text));

CREATE policy "Avatar images are publicly accessible." ON "storage"."objects" AS permissive FOR
SELECT TO public USING ((bucket_id = 'avatars'::text));