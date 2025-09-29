CREATE TABLE IF NOT EXISTS UserProfiles (
    -- id CHAR(36) PRIMARY KEY,
    userId CHAR(36) NOT NULL UNIQUE,    	
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50),
    dob DATE,
    gender ENUM('male','female','other'),
    phone VARCHAR(20),
    addressId CHAR(36),      	
    roleSpecificDetails JSON, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT fk_address FOREIGN KEY (addressId) REFERENCES Addresses(id) ON DELETE SET NULL
);