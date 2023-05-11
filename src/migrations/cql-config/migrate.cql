
CREATE TABLE IF NOT EXISTS public.users
(
    id UUID,
    name   TEXT,
    isAdmin  BOOLEAN,   
    PRIMARY KEY (id)
);
