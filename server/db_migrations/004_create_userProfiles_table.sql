CREATE TABLE UserProfiles (
    userId CHAR(36) PRIMARY KEY, -- one-to-one with Users
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50),
    dob DATE NOT NULL,
    gender ENUM('male','female','other') NOT NULL,
    phone VARCHAR(20) NOT NULL,
    addressId CHAR(36),

    -- Student-specific
    studentProfilePic VARCHAR(255),
    guardianName VARCHAR(100),
    guardianPhone VARCHAR(20),
    bloodGroup VARCHAR(10),
    previousSchool VARCHAR(255),

    -- Faculty-specific
    facultyProfilePic VARCHAR(255),
    designation VARCHAR(100),
    specialization VARCHAR(100),
    qualifications VARCHAR(255),
    yearsOfExperience INT,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT fk_address FOREIGN KEY (addressId) REFERENCES Addresses(id) ON DELETE SET NULL
);