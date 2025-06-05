DROP TABLE IF EXISTS Catch;
DROP TABLE IF EXISTS Outing;
DROP TABLE IF EXISTS LocationImages;
DROP TABLE IF EXISTS Location;

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
    Username VARCHAR(50),
    Notes VARCHAR(500),
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
	Species VARCHAR(50) NOT NULL,
	CatchLength NUMERIC(5,2),
	CatchWeight NUMERIC(5,2),
	Likes SMALLINT DEFAULT 0,
    ImageUrl VARCHAR(500),
	CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Delete existing data (in correct order)
DELETE FROM Catch;
DELETE FROM Outing;
DELETE FROM LocationImages;
DELETE FROM Location;

-- Reset sequences (optional in dev)
-- ALTER SEQUENCE location_locationid_seq RESTART WITH 1;
-- ALTER SEQUENCE outing_outingid_seq RESTART WITH 1;
-- ALTER SEQUENCE catch_catchid_seq RESTART WITH 1;
-- ALTER SEQUENCE locationimages_imageid_seq RESTART WITH 1;

-- Insert Locations and capture their IDs
WITH inserted_locations AS (
    INSERT INTO Location (LocationName, Lat, Long, LocationDescription)
    VALUES
        ('Trial Lake', '40.6830051', '-110.9545998', 'Lovely Uinta Mountain Lake'),
        ('Lake Powell','36.9333','-111.4833','Gets real warm down here'),
        ('Bear Lake','40.8461246','-110.3990331', 'Gets real cold up here'),
        ('Fish Lake','38.5514','-111.705','Must be fish in here, right? Also here is some additional text to show a really really long description some people like to write a lot and we should handle long text like this appropriately Timberland is a dirty stinky catfish and I must admit sometimes I want to use him as live bait do not tell Rachel.  I have nothing else left to say but to quote Dave Blunt lyrics baby i trieeed but i cant quit the codeine my double cuuup is killing me slowly without leeeean i tend to get so lonely baby come and hold me baby come and baby i trieeed but i cant quit the codeine my double cuuup is killing me slowly without leeeean i tend to get so lonely baby come and hold me baby come and baby i trieeed but i cant quit the codeine my double cuuup is killing me slowly without leeeean i tend to get so lonely baby come and hold me baby come and baby i trieeed but i cant quit the codeine my double cuuup is killing me slowly without leeeean i tend to get so lonely baby come and hold me baby come and')
    RETURNING LocationId, LocationName
),

-- Insert Outings and reference inserted LocationIds
inserted_outings AS (
    INSERT INTO Outing (LocationId, Username, OutingDate, StartTime, EndTime)
    SELECT
        l.LocationId,
        d.Username,
        d.OutingDate,
        d.StartTime,
        d.EndTime
    FROM inserted_locations l
    JOIN (VALUES
            ('Trial Lake', 'Matt Montuah', CAST('2024-07-15' AS DATE), CAST('07:45:00' AS TIME), CAST('18:00:00' AS TIME)),
        ('Trial Lake', 'Matt Montuah', CAST('2024-07-10' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Trial Lake', 'Matt Montuah', CAST('2024-07-12' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Trial Lake', 'Matt Montuah', CAST('2024-08-10' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Trial Lake', 'Matt Montuah', CAST('2024-11-03' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Trial Lake', 'Gayden Fartin', CAST('2024-09-19' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Trial Lake', 'Gayden Fartin', CAST('2024-01-10' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Trial Lake', 'Gayden Fartin', CAST('2024-03-13' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Trial Lake', 'Gayden Fartin', CAST('2024-04-14' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Trial Lake', 'Gayden Fartin', CAST('2024-12-10' AS DATE), CAST('06:00:00' AS TIME), CAST('10:00:00' AS TIME)),
        ('Lake Powell', 'Josiah Biden', CAST('2024-08-15' AS DATE), CAST('07:30:00' AS TIME), CAST('11:30:00' AS TIME))
    ) AS d(LocationName, Username, OutingDate, StartTime, EndTime)
    ON l.LocationName = d.LocationName
    RETURNING OutingId, LocationId, OutingDate
),

inserted_catches AS(  
    INSERT INTO Catch (OutingId, Species, CatchLength, CatchWeight, Likes, ImageUrl)
    SELECT
        o.OutingId,
        c.Species,
        c.CatchLength,
        c.CatchWeight,
        c.Likes,
        c.ImageUrl
    FROM inserted_outings o
    JOIN (VALUES
        ('2024-07-10', 'Rainbow Trout', 18.50, 2.30, 2, 'https://www.wildtrout.org/assets/img/general/_640xAUTO_crop_center-center_none/Wye-wild-rainbow-comp.jpg'),
        ('2024-07-10', 'Smallmouth Bass', 16.00, 2.00, 23, 'https://www.ndow.org/wp-content/uploads/2021/10/micropterus_dolomieu-scaled.jpeg'),
        ('2024-08-15', 'Channel Catfish', 25.75, 4.10, 1000, 'https://files.blogs.illinois.edu/files/7362/140158490/186285.jpg'),
        ('2024-12-10', 'Brook Trout', null, null, 0, 'https://www.fws.gov/sites/default/files/2021-09/brook%20trout%20Credit%20Scott%20Cornett%2C%20NYDEC.jpg'),
        ('2024-04-14', 'Brook Trout', null, null, 0, 'https://www.fws.gov/sites/default/files/2021-09/brook%20trout%20Credit%20Scott%20Cornett%2C%20NYDEC.jpg'),
        ('2024-03-13', 'Smallmouth Bass', 12, 3.5, 5, 'https://www.ndow.org/wp-content/uploads/2021/10/micropterus_dolomieu-scaled.jpeg')
    ) AS c(OutingDate, Species, CatchLength, CatchWeight, Likes, ImageUrl)
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
('Bear Lake', 'https://upload.wikimedia.org/wikipedia/commons/4/48/Bear_Lake.jpg'),
('Fish Lake', 'https://geology.utah.gov/wp-content/uploads/11_2019_Fishlake_J_Lucy_Jordan-1.jpg'),
('Trial Lake', 'https://photos.thedyrt.com/photo/553794/media/trial-lake-campground_5364ccf2-a7b0-4128-92f1-12542abfe05a.heic?auto=webp'),
('Trial Lake', 'https://lh3.googleusercontent.com/places/AAcXr8rxFf-OyXn4teYV_buyZsVff9lBhErxHi0RNar_LPY6yvuqRMnDrxeM5DBFOrAPoIZPVmclGsmxaq4kxoe5__gV_mpnKQAXOS8=s1600-h3024')
) AS li(LocationName, StoragePath)
ON l.LocationName = li.LocationName;