const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'root',
  database: 'agriculture',
})

db.connect((err) => {
  if (err) {
    console.log('Database Error:', err)
  } else {
    console.log('MySQL Connected')

    const schemaQueries = [
      `CREATE TABLE IF NOT EXISTS farmers_report (
        id INT AUTO_INCREMENT PRIMARY KEY,
        farmer_name VARCHAR(120) NOT NULL,
        phone_number VARCHAR(40),
        crop VARCHAR(80),
        location VARCHAR(120),
        land_size VARCHAR(40),
        status VARCHAR(40) DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS crops (
        id INT AUTO_INCREMENT PRIMARY KEY,
        crop_name VARCHAR(120) NOT NULL,
        crop_type VARCHAR(80),
        season VARCHAR(80),
        status VARCHAR(40) DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS inventory (
        id INT AUTO_INCREMENT PRIMARY KEY,
        item_name VARCHAR(120) NOT NULL,
        category VARCHAR(80),
        quantity INT DEFAULT 0,
        unit VARCHAR(20) DEFAULT 'kg',
        status VARCHAR(40) DEFAULT 'Available',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS service_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        request_title VARCHAR(160) NOT NULL,
        request_type VARCHAR(80),
        requested_by VARCHAR(120),
        priority VARCHAR(30) DEFAULT 'Medium',
        status VARCHAR(40) DEFAULT 'Pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role_name VARCHAR(80) NOT NULL UNIQUE,
        description VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS permissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        permission_key VARCHAR(120) NOT NULL UNIQUE,
        description VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(140) NOT NULL,
        email VARCHAR(160) NOT NULL UNIQUE,
        password_hash VARCHAR(255),
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS role_permissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role_id INT NOT NULL,
        permission_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_role_permission (role_id, permission_id),
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
        FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
      )`,
      `CREATE TABLE IF NOT EXISTS user_roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        role_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_user_role (user_id, role_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
      )`,
      `CREATE TABLE IF NOT EXISTS system_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(120) NOT NULL UNIQUE,
        setting_value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
    ]

    schemaQueries.forEach((query) => {
      db.query(query, (schemaErr) => {
        if (schemaErr) {
          console.log('Schema setup error:', schemaErr.message)
        }
      })
    })

    const seedQueries = [
      `INSERT INTO roles (role_name, description)
       VALUES
         ('Admin', 'Full access to all resources'),
         ('Manager', 'Can manage operations and reports'),
         ('Viewer', 'Read-only access')
       ON DUPLICATE KEY UPDATE description=VALUES(description)`,
      `INSERT INTO permissions (permission_key, description)
       VALUES
         ('users.read', 'Read users'),
         ('users.create', 'Create users'),
         ('users.update', 'Update users'),
         ('users.delete', 'Delete users'),
         ('roles.read', 'Read roles'),
         ('roles.create', 'Create roles'),
         ('roles.update', 'Update roles'),
         ('roles.delete', 'Delete roles'),
         ('settings.read', 'Read settings'),
         ('settings.update', 'Update settings')
       ON DUPLICATE KEY UPDATE description=VALUES(description)`,
      `INSERT INTO system_settings (setting_key, setting_value)
       VALUES
         ('site_name', 'Agri Dashboard'),
         ('default_language', 'en'),
         ('timezone', 'Asia/Kathmandu')
       ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value)`,
    ]

    seedQueries.forEach((query) => {
      db.query(query, (seedErr) => {
        if (seedErr) {
          console.log('Seed setup error:', seedErr.message)
        }
      })
    })

    const runMigrationQuery = (query, values = []) => new Promise((resolve, reject) => {
      db.query(query, values, (migrationErr, result) => {
        if (migrationErr) {
          reject(migrationErr)
          return
        }

        resolve(result)
      })
    })

    const hasColumn = async (columnName) => {
      const rows = await runMigrationQuery('SHOW COLUMNS FROM users LIKE ?', [columnName])
      return rows.length > 0
    }

    const runUserTableMigrations = async () => {
      try {
        if (!await hasColumn('full_name')) {
          await runMigrationQuery('ALTER TABLE users ADD COLUMN full_name VARCHAR(140) NULL')
        }

        if (!await hasColumn('is_active')) {
          await runMigrationQuery('ALTER TABLE users ADD COLUMN is_active TINYINT(1) DEFAULT 1')
        }

        await runMigrationQuery('ALTER TABLE users MODIFY COLUMN password_hash VARCHAR(255) NULL')

        if (await hasColumn('name')) {
          await runMigrationQuery(`
            UPDATE users
            SET full_name = name
            WHERE (full_name IS NULL OR full_name = '')
            AND name IS NOT NULL
          `)
        }

        if (await hasColumn('status')) {
          await runMigrationQuery(`
            UPDATE users
            SET is_active = CASE WHEN status = 'active' THEN 1 ELSE 0 END
            WHERE status IS NOT NULL
          `)
        }

        await runMigrationQuery(`
          UPDATE users
          SET full_name = email
          WHERE full_name IS NULL OR full_name = ''
        `)

        await runMigrationQuery('ALTER TABLE users MODIFY COLUMN full_name VARCHAR(140) NOT NULL')
      } catch (migrationErr) {
        console.log('Migration error:', migrationErr.message)
      }
    }

    runUserTableMigrations()
  }
})

module.exports = db