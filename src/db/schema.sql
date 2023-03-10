CREATE TABLE "users"(
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "profile"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "lastname" VARCHAR(255),
    "date_of_birth" DATE,
    "place_of_birth" VARCHAR(255),
    "school" VARCHAR(255),
    "work" VARCHAR(255),
    "hobby" VARCHAR(255),
    "country" VARCHAR(255),
    "bio" VARCHAR(255),
    "user_id" BIGINT,
    "profile_picture" VARCHAR(255),
    "private" BOOLEAN,
    "facebook_id" VARCHAR(255),
    "google_id" VARCHAR(255),
    "apple_id" BIGINT 
);
ALTER TABLE
    "profile" ADD PRIMARY KEY("id");
CREATE TABLE "user_per_family"(
    "profile_id" BIGINT NOT NULL,
    "family_id" BIGINT NOT NULL
);
ALTER TABLE
    "user_per_family" ADD PRIMARY KEY("profile_id");
CREATE TABLE "family"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "admin_id" BIGINT
);
ALTER TABLE
    "family" ADD PRIMARY KEY("id");
CREATE TABLE "event"(
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "descripition" VARCHAR(255) NOT NULL,
    "profile_id" BIGINT NOT NULL
);
ALTER TABLE
    "event" ADD PRIMARY KEY("id");
ALTER TABLE
    "event" ADD CONSTRAINT "event_profile_id_foreign" FOREIGN KEY("profile_id") REFERENCES "profile"("id");
ALTER TABLE
    "profile" ADD CONSTRAINT "profile_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "user_per_family" ADD CONSTRAINT "user_per_family_family_id_foreign" FOREIGN KEY("family_id") REFERENCES "family"("id");