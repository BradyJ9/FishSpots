-- DROP TABLE IF EXISTS CatchImages;
-- DROP TABLE IF EXISTS Catch;
-- DROP TABLE IF EXISTS Outing;
-- DROP TABLE IF EXISTS LocationImages;
-- DROP TABLE IF EXISTS Location;

CREATE TABLE IF NOT EXISTS Location (
	LocationID SERIAL PRIMARY KEY,
	LocationName VARCHAR(255) NOT NULL,
	LocationDescription VARCHAR(1000),
	Lat VARCHAR(50) NOT NULL,
	Long VARCHAR(50) NOT NULL,
	CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS LocationImages (
	ImageID SERIAL PRIMARY KEY,
	LocationID INT NOT NULL,
	FOREIGN KEY (LocationID) REFERENCES Location (LocationID),
	StoragePath VARCHAR(1024) NOT NULL
);

CREATE TABLE IF NOT EXISTS Outing (
	OutingID SERIAL PRIMARY KEY,
	LocationID INT NOT NULL,
	FOREIGN KEY (LocationId) REFERENCES Location (LocationID),
	OutingDate DATE NOT NULL,
	StartTime TIME,
	EndTime TIME,
	CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Catch (
	CatchID SERIAL PRIMARY KEY,
	OutingID INT NOT NULL,
	FOREIGN KEY (OutingID) REFERENCES Outing (OutingID),
	Species VARCHAR(50),
	CatchLength NUMERIC(5,2),
	CatchWeight NUMERIC(5,2),
	Likes SMALLINT DEFAULT 0,
	CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS CatchImages (
	ImageID SERIAL PRIMARY KEY,
	CatchID INT NOT NULL,
	FOREIGN KEY (CatchID) REFERENCES Catch (CatchID),
	StoragePath VARCHAR(1024) NOT NULL
);

-- Delete existing data (in correct order)
DELETE FROM CatchImages;
DELETE FROM Catch;
DELETE FROM Outing;
DELETE FROM LocationImages;
DELETE FROM Location;

-- Reset sequences (optional in dev)
-- ALTER SEQUENCE location_locationid_seq RESTART WITH 1;
-- ALTER SEQUENCE outing_outingid_seq RESTART WITH 1;
-- ALTER SEQUENCE catch_catchid_seq RESTART WITH 1;
-- ALTER SEQUENCE locationimages_imageid_seq RESTART WITH 1;
-- ALTER SEQUENCE catchimages_imageid_seq RESTART WITH 1;

-- Insert Locations and capture their IDs
WITH inserted_locations AS (
    INSERT INTO Location (LocationName, Lat, Long, LocationDescription)
    VALUES
        ('Trial Lake', '40.6830051', '-110.9545998', 'Lovely Uinta Mountain Lake'),
        ('Lake Powell','36.9333','-111.4833','Gets real warm down here'),
        ('Bear Lake','40.8461246','-110.3990331', 'Gets real cold up here')
    RETURNING LocationId, LocationName
),

-- Insert Outings and reference inserted LocationIds
inserted_outings AS (
    INSERT INTO Outing (LocationId, OutingDate, StartTime, EndTime)
    SELECT
        l.LocationId,
        d.OutingDate,
        d.StartTime,
        d.EndTime
    FROM inserted_locations l
    JOIN (VALUES
            ('Trial Lake', CAST('2024-07-15' AS DATE), CAST('07:45:00' AS TIME), CAST('18:00:00' AS TIME)),
        ('Trial Lake', CAST('2024-07-10' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Trial Lake', CAST('2024-07-12' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Trial Lake', CAST('2024-08-10' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Trial Lake', CAST('2024-11-03' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Trial Lake', CAST('2024-09-19' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Trial Lake', CAST('2024-01-10' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Trial Lake', CAST('2024-03-13' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Trial Lake', CAST('2024-04-14' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Trial Lake', CAST('2024-12-10' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Lake Powell', CAST('2024-08-15' AS DATE), CAST('07:30:00' AS TIME), CAST('11:30:00' AS TIME))
    ) AS d(LocationName, OutingDate, StartTime, EndTime)
    ON l.LocationName = d.LocationName
    RETURNING OutingId, LocationId, OutingDate
),

inserted_catches AS(  
    INSERT INTO Catch (OutingId, Species, CatchLength, CatchWeight, Likes)
    SELECT
        o.OutingId,
        c.Species,
        c.CatchLength,
        c.CatchWeight,
        c.Likes
    FROM inserted_outings o
    JOIN (VALUES
        ('2024-07-10', 'Rainbow Trout', 18.50, 2.30, 2),
        ('2024-07-10', 'Smallmouth Bass', 16.00, 2.00, 23),
        ('2024-08-15', 'Channel Catfish', 25.75, 4.10, 1000),
        ('2024-12-10', 'Brook Trout', null, null, 0),
        ('2024-04-14', 'Brook Trout', null, null, 0),
        ('2024-03-13', 'Smallmouth Bass', 12, 3.5, 5)
    ) AS c(OutingDate, Species, CatchLength, CatchWeight, Likes)
    ON CAST(o.OutingDate AS DATE) = CAST(c.OutingDate AS DATE)
)

INSERT INTO LocationImages (LocationID, StoragePath)
SELECT
    l.LocationId,
    li.StoragePath
FROM inserted_locations l
JOIN (VALUES
('Trial Lake', 'https://3.bp.blogspot.com/-eIe5T9OMIhY/UjI7TYGyxII/AAAAAAAABts/x3wewmJKp6Q/s1600/unsinkable2-2013-07-21-00079.JPG'),
('Lake Powell', 'https://ctfassets.ksldigital.com/0wjmk6wgfops/6dk4N8fQLpGCMCCTBhPm8s/9c6c36bf360076d793738404612629c1/AdobeStock_190040875.jpeg?q=70'),
('Bear Lake', 'https://upload.wikimedia.org/wikipedia/commons/4/48/Bear_Lake.jpg')
) AS li(LocationName, StoragePath)
ON l.LocationName = li.LocationName;

INSERT INTO CatchImages (CatchID, StoragePath)
SELECT
    c.CatchID,
    i.StoragePath
FROM Catch c
JOIN (VALUES
    ('Rainbow Trout','2024-07-10', 'https://www.wildtrout.org/assets/img/general/_640xAUTO_crop_center-center_none/Wye-wild-rainbow-comp.jpg'),
    ('Smallmouth Bass','2024-07-10', 'https://www.ndow.org/wp-content/uploads/2021/10/micropterus_dolomieu-scaled.jpeg'),
    ('Channel Catfish','2024-08-15', 'https://files.blogs.illinois.edu/files/7362/140158490/186285.jpg'),
    ('Brook Trout', '2024-04-14', 'https://www.fws.gov/sites/default/files/2021-09/brook%20trout%20Credit%20Scott%20Cornett%2C%20NYDEC.jpg'),
    ('Smallmouth Bass','2024-03-13', 'https://www.ndow.org/wp-content/uploads/2021/10/micropterus_dolomieu-scaled.jpeg')
) AS i(Species, OutingDate, StoragePath)
ON c.Species = i.Species
AND c.OutingID IN (
    SELECT OutingID FROM Outing WHERE CAST(OutingDate AS DATE) = CAST(i.OutingDate AS DATE)
);