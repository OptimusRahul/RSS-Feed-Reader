CREATE TABLE rssinfo.url
(
    "Id" integer NOT NULL DEFAULT nextval('rssinfo."url_Id_seq"'::regclass),
    links text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT url_links_key UNIQUE (links)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE rssinfo.url
    OWNER to postgres;
