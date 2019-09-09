CREATE TABLE rssinfo.feed
(
    feed_id integer NOT NULL DEFAULT nextval('rssinfo.feed_feed_id_seq'::regclass),
    feedtitle text COLLATE pg_catalog."default" NOT NULL,
    feedcontent text COLLATE pg_catalog."default" NOT NULL,
    feedurls text COLLATE pg_catalog."default" NOT NULL,
    feedprovider text COLLATE pg_catalog."default" NOT NULL,
    feedcategory text COLLATE pg_catalog."default" NOT NULL,
    feeddatetime timestamp without time zone,
    CONSTRAINT feed_pkey PRIMARY KEY (feed_id),
    CONSTRAINT feed_feedcontent_feedurls_key UNIQUE (feedcontent, feedurls)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE rssinfo.feed
    OWNER to postgres;
