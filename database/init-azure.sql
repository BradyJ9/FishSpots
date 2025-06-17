-- Drop tables in dependency order
IF OBJECT_ID('Catch', 'U') IS NOT NULL DROP TABLE Catch;
IF OBJECT_ID('Outing', 'U') IS NOT NULL DROP TABLE Outing;
IF OBJECT_ID('LocationImages', 'U') IS NOT NULL DROP TABLE LocationImages;
IF OBJECT_ID('Location', 'U') IS NOT NULL DROP TABLE Location;

-- Tables
CREATE TABLE Location (
    LocationID INT IDENTITY(1,1) PRIMARY KEY,
    LocationName VARCHAR(255) NOT NULL,
    LocationDescription VARCHAR(1000),
    Lat VARCHAR(50) NOT NULL,
    Long VARCHAR(50) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE LocationImages (
    ImageID INT IDENTITY(1,1) PRIMARY KEY,
    LocationID INT NOT NULL,
    StoragePath VARCHAR(1024) NOT NULL,
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID)
);

CREATE TABLE Outing (
    OutingID INT IDENTITY(1,1) PRIMARY KEY,
    LocationID INT NOT NULL,
    Username VARCHAR(50),
    Notes VARCHAR(500),
    OutingDate DATE NOT NULL,
    StartTime TIME,
    EndTime TIME,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID)
);

CREATE TABLE Catch (
    CatchID INT IDENTITY(1,1) PRIMARY KEY,
    OutingID INT NOT NULL,
    Species VARCHAR(50) NOT NULL,
    CatchLength DECIMAL(5,2),
    CatchWeight DECIMAL(5,2),
    Likes SMALLINT DEFAULT 0,
    ImageUrl VARCHAR(500),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (OutingID) REFERENCES Outing(OutingID)
);

-- OPTIONAL: DELETE and reseed data
-- DELETE FROM Catch;
-- DELETE FROM Outing;
-- DELETE FROM LocationImages;
-- DELETE FROM Location;

-- Insert Locations
DECLARE @InsertedLocations TABLE (LocationID INT, LocationName VARCHAR(255));

INSERT INTO Location (LocationName, Lat, Long, LocationDescription)
OUTPUT INSERTED.LocationID, INSERTED.LocationName INTO @InsertedLocations
VALUES
    ('Trial Lake', '40.6830051', '-110.9545998', 'Lovely Uinta Mountain Lake'),
    ('Lake Powell','36.9333','-111.4833','Gets real warm down here'),
    ('Bear Lake','40.8461246','-110.3990331', 'Gets real cold up here'),
    ('Fish Lake','38.5514','-111.705','Must be fish in here, right? Also here is some additional text...'),
    ('The Goat', '37.2343', '-115.8067','You are my sunshine...my only sunshine...');

-- Insert Outings
DECLARE @InsertedOutings TABLE (OutingID INT, OutingDate DATE);

INSERT INTO Outing (LocationID, Username, OutingDate, StartTime, EndTime)
OUTPUT INSERTED.OutingID, INSERTED.OutingDate INTO @InsertedOutings
SELECT
    l.LocationID,
    o.Username,
    o.OutingDate,
    o.StartTime,
    o.EndTime
FROM @InsertedLocations l
JOIN (VALUES
    ('Trial Lake', 'Matt Montuah', '2024-07-15', '07:45:00', '18:00:00'),
    ('Trial Lake', 'Matt Montuah', '2024-07-10', '06:00:00', '10:00:00'),
    ('Trial Lake', 'Matt Montuah', '2024-07-12', '06:00:00', '10:00:00'),
    ('Trial Lake', 'Matt Montuah', '2024-08-10', '06:00:00', '10:00:00'),
    ('Trial Lake', 'Matt Montuah', '2024-11-03', '06:00:00', '10:00:00'),
    ('Trial Lake', 'Gayden Fartin', '2024-09-19', '06:00:00', '10:00:00'),
    ('Trial Lake', 'Gayden Fartin', '2024-01-10', '06:00:00', '10:00:00'),
    ('Trial Lake', 'Gayden Fartin', '2024-03-13', '06:00:00', '10:00:00'),
    ('Trial Lake', 'Gayden Fartin', '2024-04-14', '06:00:00', '10:00:00'),
    ('Trial Lake', 'Gayden Fartin', '2024-12-10', '06:00:00', '10:00:00'),
    ('Lake Powell', 'Josiah Biden', '2024-08-15', '07:30:00', '11:30:00')
) AS o(LocationName, Username, OutingDate, StartTime, EndTime)
ON l.LocationName = o.LocationName;

-- Insert Catches
INSERT INTO Catch (OutingID, Species, CatchLength, CatchWeight, Likes, ImageUrl)
SELECT
    o.OutingID,
    c.Species,
    c.CatchLength,
    c.CatchWeight,
    c.Likes,
    c.ImageUrl
FROM @InsertedOutings o
JOIN (VALUES
    ('2024-07-10', 'Rainbow Trout', 18.50, 2.30, 2, 'catchimages/rainbowtrout.jpg'),
    ('2024-07-10', 'Smallmouth Bass', 16.00, 2.00, 23, 'catchimages/smallmouth.jpeg'),
    ('2024-08-15', 'Channel Catfish', 25.75, 4.10, 1000, 'catchimages/catfish.jpg'),
    ('2024-12-10', 'Brook Trout', NULL, NULL, 0, 'catchimages/brooktrout.jpg'),
    ('2024-04-14', 'Brook Trout', NULL, NULL, 0, 'catchimages/brooktrout.jpg'),
    ('2024-03-13', 'Smallmouth Bass', 12, 3.5, 5, 'catchimages/smallmouth.jpeg')
) AS c(OutingDate, Species, CatchLength, CatchWeight, Likes, ImageUrl)
ON o.OutingDate = CAST(c.OutingDate AS DATE);

-- Insert LocationImages
INSERT INTO LocationImages (LocationID, StoragePath)
SELECT
    l.LocationID,
    i.StoragePath
FROM @InsertedLocations l
JOIN (VALUES
    ('Trial Lake', 'locationimages/trial-lake.jpg'),
    ('Lake Powell', 'locationimages/lake-powell.jpg'),
    ('Bear Lake', 'locationimages/bear-lake.jpg'),
    ('Fish Lake', 'locationimages/fish-lake.jpg'),
    ('Trial Lake', 'locationimages/trial-lake2.jpg'),
    ('Trial Lake', 'locationimages/trial-lake3.jpg'),
    ('The Goat', 'locationimages/lebron-james-lets-go.gif')
) AS i(LocationName, StoragePath)
ON l.LocationName = i.LocationName;
