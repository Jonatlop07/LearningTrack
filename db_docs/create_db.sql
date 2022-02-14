BEGIN;

DROP TABLE IF EXISTS learning_tracker.concept_translation;
DROP TABLE IF EXISTS learning_tracker.concept_example;
DROP TABLE IF EXISTS learning_tracker.section_example;
DROP TABLE IF EXISTS learning_tracker.concept;
DROP TABLE IF EXISTS learning_tracker.section;
DROP TABLE IF EXISTS learning_tracker.language;
DROP TABLE IF EXISTS learning_tracker.user;

CREATE TABLE IF NOT EXISTS learning_tracker.user
(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(40) NOT NULL,
    email VARCHAR (125) NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS learning_tracker.language
(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at DATE NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES learning_tracker.user (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS learning_tracker.section
(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    language_id BIGINT NOT NULL,
    CONSTRAINT fk_language
        FOREIGN KEY(language_id)
            REFERENCES learning_tracker.language (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS learning_tracker.concept
(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at DATE NOT NULL,
    section_id BIGINT NOT NULL,
    CONSTRAINT fk_section
        FOREIGN KEY(section_id)
            REFERENCES learning_tracker.section (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS learning_tracker.section_example
(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    value TEXT NOT NULL,
    translation TEXT NOT NULL,
    section_id BIGINT NOT NULL,
    CONSTRAINT fk_section
        FOREIGN KEY(section_id)
            REFERENCES learning_tracker.section (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS learning_tracker.concept_example
(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    value TEXT NOT NULL,
    translation TEXT NOT NULL,
    concept_id BIGINT NOT NULL,
    CONSTRAINT fk_concept
        FOREIGN KEY(concept_id)
            REFERENCES learning_tracker.concept (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS learning_tracker.concept_translation
(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    value TEXT NOT NULL,
    concept_id BIGINT NOT NULL,
    CONSTRAINT fk_concept
        FOREIGN KEY(concept_id)
            REFERENCES learning_tracker.concept (id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
);

END;
