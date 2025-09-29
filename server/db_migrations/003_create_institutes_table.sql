CREATE TABLE IF NOT EXISTS Institutes (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL, -- official institute email
    addressId CHAR(36),
    description TEXT,
    logoUrl VARCHAR(255),
    createdBy CHAR(36) NOT NULL, 
    status ENUM('active','inactive','pending_approval') DEFAULT 'active',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (createdBy) REFERENCES Users(id),
    FOREIGN KEY (addressId) REFERENCES Addresses(id) ON DELETE SET NULL
);