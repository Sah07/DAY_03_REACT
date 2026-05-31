const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const db = require('./db')

const app = express()

app.use(cors())
app.use(bodyParser.json())

const runQuery = (sql, values = []) => new Promise((resolve, reject) => {
  db.query(sql, values, (err, result) => {
    if (err) {
      reject(err)
      return
    }

    resolve(result)
  })
})

/* GET ALL FARMERS */

app.get('/farmers', (req, res) => {

  const sql = 'SELECT * FROM farmers_report ORDER BY id DESC'

  db.query(sql, (err, result) => {

    if (err) {
      res.status(500).json(err)
    } else {
      res.json(result)
    }

  })
})

/* INSERT FARMER */

app.post('/farmers', (req, res) => {

  const {
    farmer_name,
    phone_number,
    crop,
    location,
    land_size,
    status,
  } = req.body

  const sql = `
    INSERT INTO farmers_report
    (
      farmer_name,
      phone_number,
      crop,
      location,
      land_size,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `

  db.query(
    sql,
    [
      farmer_name,
      phone_number,
      crop,
      location,
      land_size,
      status,
    ],
    (err, result) => {

      if (err) {
        res.status(500).json(err)
      } else {
        res.json({
          message: 'Farmer Added',
          result,
        })
      }

    }
  )
})

/* DELETE FARMER */

app.delete('/farmers/:id', (req, res) => {

  const sql =
    'DELETE FROM farmers_report WHERE id=?'

  db.query(
    sql,
    [req.params.id],
    (err, result) => {

      if (err) {
        res.status(500).json(err)
      } else {
        res.json({
          message: 'Deleted Successfully',
        })
      }

    }
  )
})

/* UPDATE FARMER */

app.put('/farmers/:id', (req, res) => {

  const {
    farmer_name,
    phone_number,
    crop,
    location,
    land_size,
    status,
  } = req.body

  const sql = `
    UPDATE farmers_report
    SET
      farmer_name=?,
      phone_number=?,
      crop=?,
      location=?,
      land_size=?,
      status=?
    WHERE id=?
  `

  db.query(
    sql,
    [
      farmer_name,
      phone_number,
      crop,
      location,
      land_size,
      status,
      req.params.id,
    ],
    (err, result) => {

      if (err) {
        res.status(500).json(err)
      } else {
        res.json({
          message: 'Updated Successfully',
        })
      }

    }
  )
})

/* GET ALL CROPS */

app.get('/crops', (req, res) => {
  const sql = 'SELECT * FROM crops ORDER BY id DESC'

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json(result)
    }
  })
})

/* INSERT CROP */

app.post('/crops', (req, res) => {
  const {
    crop_name,
    crop_type,
    season,
    status,
  } = req.body

  const sql = `
    INSERT INTO crops
    (
      crop_name,
      crop_type,
      season,
      status
    )
    VALUES (?, ?, ?, ?)
  `

  db.query(
    sql,
    [
      crop_name,
      crop_type,
      season,
      status || 'Active',
    ],
    (err, result) => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.json({
          message: 'Crop Added',
          result,
        })
      }
    }
  )
})

/* UPDATE CROP */

app.put('/crops/:id', (req, res) => {
  const {
    crop_name,
    crop_type,
    season,
    status,
  } = req.body

  const sql = `
    UPDATE crops
    SET
      crop_name=?,
      crop_type=?,
      season=?,
      status=?
    WHERE id=?
  `

  db.query(
    sql,
    [
      crop_name,
      crop_type,
      season,
      status,
      req.params.id,
    ],
    (err) => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.json({
          message: 'Crop Updated Successfully',
        })
      }
    }
  )
})

/* DELETE CROP */

app.delete('/crops/:id', (req, res) => {
  const sql = 'DELETE FROM crops WHERE id=?'

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json({
        message: 'Crop Deleted Successfully',
      })
    }
  })
})

/* GET ALL INVENTORY ITEMS */

app.get('/inventory', (req, res) => {
  const sql = 'SELECT * FROM inventory ORDER BY id DESC'

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json(result)
    }
  })
})

/* INSERT INVENTORY ITEM */

app.post('/inventory', (req, res) => {
  const {
    item_name,
    category,
    quantity,
    unit,
    status,
  } = req.body

  const sql = `
    INSERT INTO inventory
    (
      item_name,
      category,
      quantity,
      unit,
      status
    )
    VALUES (?, ?, ?, ?, ?)
  `

  db.query(
    sql,
    [
      item_name,
      category,
      Number(quantity || 0),
      unit || 'kg',
      status || 'Available',
    ],
    (err, result) => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.json({
          message: 'Inventory Item Added',
          result,
        })
      }
    }
  )
})

/* UPDATE INVENTORY ITEM */

app.put('/inventory/:id', (req, res) => {
  const {
    item_name,
    category,
    quantity,
    unit,
    status,
  } = req.body

  const sql = `
    UPDATE inventory
    SET
      item_name=?,
      category=?,
      quantity=?,
      unit=?,
      status=?
    WHERE id=?
  `

  db.query(
    sql,
    [
      item_name,
      category,
      Number(quantity || 0),
      unit,
      status,
      req.params.id,
    ],
    (err) => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.json({
          message: 'Inventory Item Updated Successfully',
        })
      }
    }
  )
})

/* DELETE INVENTORY ITEM */

app.delete('/inventory/:id', (req, res) => {
  const sql = 'DELETE FROM inventory WHERE id=?'

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json({
        message: 'Inventory Item Deleted Successfully',
      })
    }
  })
})

/* GET ALL SERVICE REQUESTS */

app.get('/requests', (req, res) => {
  const sql = 'SELECT * FROM service_requests ORDER BY id DESC'

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json(result)
    }
  })
})

/* INSERT SERVICE REQUEST */

app.post('/requests', (req, res) => {
  const {
    request_title,
    request_type,
    requested_by,
    priority,
    status,
    notes,
  } = req.body

  const sql = `
    INSERT INTO service_requests
    (
      request_title,
      request_type,
      requested_by,
      priority,
      status,
      notes
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `

  db.query(
    sql,
    [
      request_title,
      request_type,
      requested_by,
      priority || 'Medium',
      status || 'Pending',
      notes,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.json({
          message: 'Request Added',
          result,
        })
      }
    }
  )
})

/* UPDATE SERVICE REQUEST */

app.put('/requests/:id', (req, res) => {
  const {
    request_title,
    request_type,
    requested_by,
    priority,
    status,
    notes,
  } = req.body

  const sql = `
    UPDATE service_requests
    SET
      request_title=?,
      request_type=?,
      requested_by=?,
      priority=?,
      status=?,
      notes=?
    WHERE id=?
  `

  db.query(
    sql,
    [
      request_title,
      request_type,
      requested_by,
      priority,
      status,
      notes,
      req.params.id,
    ],
    (err) => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.json({
          message: 'Request Updated Successfully',
        })
      }
    }
  )
})

/* DELETE SERVICE REQUEST */

app.delete('/requests/:id', (req, res) => {
  const sql = 'DELETE FROM service_requests WHERE id=?'

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json({
        message: 'Request Deleted Successfully',
      })
    }
  })
})

/* GET ALL USERS WITH ROLES */

app.get('/users', async (_req, res) => {
  try {
    const users = await runQuery(`
      SELECT
        u.id,
        u.full_name,
        u.email,
        u.is_active,
        u.created_at,
        u.updated_at,
        COALESCE(GROUP_CONCAT(r.role_name ORDER BY r.role_name SEPARATOR ', '), '') AS roles
      FROM users u
      LEFT JOIN user_roles ur ON ur.user_id = u.id
      LEFT JOIN roles r ON r.id = ur.role_id
      GROUP BY u.id
      ORDER BY u.id DESC
    `)

    res.json(users.map((user) => ({
      ...user,
      is_active: Boolean(user.is_active),
      roles: user.roles ? user.roles.split(', ').filter(Boolean) : [],
    })))
  } catch (err) {
    res.status(500).json({
      message: 'Failed to load users',
      error: err.message,
    })
  }
})

/* INSERT USER */

app.post('/users', async (req, res) => {
  try {
    const {
      full_name,
      email,
      password_hash,
      is_active,
      role_ids,
    } = req.body

    if (!full_name || !email) {
      res.status(400).json({
        message: 'full_name and email are required',
      })
      return
    }

    const result = await runQuery(
      `
        INSERT INTO users (full_name, email, password_hash, is_active)
        VALUES (?, ?, ?, ?)
      `,
      [
        full_name,
        email,
        password_hash || null,
        is_active === false ? 0 : 1,
      ]
    )

    if (Array.isArray(role_ids) && role_ids.length > 0) {
      await Promise.all(
        role_ids.map((roleId) => runQuery(
          'INSERT IGNORE INTO user_roles (user_id, role_id) VALUES (?, ?)',
          [result.insertId, roleId]
        ))
      )
    }

    res.status(201).json({
      message: 'User Added',
      id: result.insertId,
    })
  } catch (err) {
    res.status(500).json({
      message: 'Failed to add user',
      error: err.message,
    })
  }
})

/* UPDATE USER */

app.put('/users/:id', async (req, res) => {
  try {
    const {
      full_name,
      email,
      password_hash,
      is_active,
    } = req.body

    await runQuery(
      `
        UPDATE users
        SET
          full_name=?,
          email=?,
          password_hash=?,
          is_active=?
        WHERE id=?
      `,
      [
        full_name,
        email,
        password_hash || null,
        is_active === false ? 0 : 1,
        req.params.id,
      ]
    )

    res.json({
      message: 'User Updated Successfully',
    })
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update user',
      error: err.message,
    })
  }
})

/* DELETE USER */

app.delete('/users/:id', async (req, res) => {
  try {
    await runQuery('DELETE FROM users WHERE id=?', [req.params.id])

    res.json({
      message: 'User Deleted Successfully',
    })
  } catch (err) {
    res.status(500).json({
      message: 'Failed to delete user',
      error: err.message,
    })
  }
})

/* GET ALL ROLES WITH PERMISSIONS */

app.get('/roles', async (_req, res) => {
  try {
    const roles = await runQuery(`
      SELECT
        r.id,
        r.role_name,
        r.description,
        COALESCE(GROUP_CONCAT(p.permission_key ORDER BY p.permission_key SEPARATOR ', '), '') AS permissions
      FROM roles r
      LEFT JOIN role_permissions rp ON rp.role_id = r.id
      LEFT JOIN permissions p ON p.id = rp.permission_id
      GROUP BY r.id
      ORDER BY r.id DESC
    `)

    res.json(roles.map((role) => ({
      ...role,
      permissions: role.permissions ? role.permissions.split(', ').filter(Boolean) : [],
    })))
  } catch (err) {
    res.status(500).json({
      message: 'Failed to load roles',
      error: err.message,
    })
  }
})

/* INSERT ROLE */

app.post('/roles', async (req, res) => {
  try {
    const { role_name, description } = req.body

    if (!role_name) {
      res.status(400).json({
        message: 'role_name is required',
      })
      return
    }

    const result = await runQuery(
      'INSERT INTO roles (role_name, description) VALUES (?, ?)',
      [role_name, description || null]
    )

    res.status(201).json({
      message: 'Role Added',
      id: result.insertId,
    })
  } catch (err) {
    res.status(500).json({
      message: 'Failed to add role',
      error: err.message,
    })
  }
})

/* UPDATE ROLE */

app.put('/roles/:id', async (req, res) => {
  try {
    const { role_name, description } = req.body

    await runQuery(
      'UPDATE roles SET role_name=?, description=? WHERE id=?',
      [role_name, description || null, req.params.id]
    )

    res.json({
      message: 'Role Updated Successfully',
    })
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update role',
      error: err.message,
    })
  }
})

/* DELETE ROLE */

app.delete('/roles/:id', async (req, res) => {
  try {
    await runQuery('DELETE FROM roles WHERE id=?', [req.params.id])

    res.json({
      message: 'Role Deleted Successfully',
    })
  } catch (err) {
    res.status(500).json({
      message: 'Failed to delete role',
      error: err.message,
    })
  }
})

/* GET ALL PERMISSIONS */

app.get('/permissions', async (_req, res) => {
  try {
    const permissions = await runQuery(
      'SELECT * FROM permissions ORDER BY permission_key ASC'
    )
    res.json(permissions)
  } catch (err) {
    res.status(500).json({
      message: 'Failed to load permissions',
      error: err.message,
    })
  }
})

/* INSERT PERMISSION */

app.post('/permissions', async (req, res) => {
  try {
    const { permission_key, description } = req.body

    if (!permission_key) {
      res.status(400).json({
        message: 'permission_key is required',
      })
      return
    }

    const result = await runQuery(
      'INSERT INTO permissions (permission_key, description) VALUES (?, ?)',
      [permission_key, description || null]
    )

    res.status(201).json({
      message: 'Permission Added',
      id: result.insertId,
    })
  } catch (err) {
    res.status(500).json({
      message: 'Failed to add permission',
      error: err.message,
    })
  }
})

/* DELETE PERMISSION */

app.delete('/permissions/:id', async (req, res) => {
  try {
    await runQuery('DELETE FROM permissions WHERE id=?', [req.params.id])

    res.json({
      message: 'Permission Deleted Successfully',
    })
  } catch (err) {
    res.status(500).json({
      message: 'Failed to delete permission',
      error: err.message,
    })
  }
})

/* SET ROLE PERMISSIONS */

app.put('/roles/:id/permissions', async (req, res) => {
  try {
    const { permission_ids } = req.body

    await runQuery('DELETE FROM role_permissions WHERE role_id=?', [req.params.id])

    if (Array.isArray(permission_ids) && permission_ids.length > 0) {
      await Promise.all(
        permission_ids.map((permissionId) => runQuery(
          'INSERT IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
          [req.params.id, permissionId]
        ))
      )
    }

    res.json({
      message: 'Role permissions updated successfully',
    })
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update role permissions',
      error: err.message,
    })
  }
})

/* SET USER ROLES */

app.put('/users/:id/roles', async (req, res) => {
  try {
    const { role_ids } = req.body

    await runQuery('DELETE FROM user_roles WHERE user_id=?', [req.params.id])

    if (Array.isArray(role_ids) && role_ids.length > 0) {
      await Promise.all(
        role_ids.map((roleId) => runQuery(
          'INSERT IGNORE INTO user_roles (user_id, role_id) VALUES (?, ?)',
          [req.params.id, roleId]
        ))
      )
    }

    res.json({
      message: 'User roles updated successfully',
    })
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update user roles',
      error: err.message,
    })
  }
})

/* GET SETTINGS */

app.get('/settings', async (_req, res) => {
  try {
    const settingsRows = await runQuery(
      'SELECT setting_key, setting_value, updated_at FROM system_settings ORDER BY setting_key ASC'
    )

    res.json(settingsRows)
  } catch (err) {
    res.status(500).json({
      message: 'Failed to load settings',
      error: err.message,
    })
  }
})

/* UPDATE SETTINGS */

app.put('/settings', async (req, res) => {
  try {
    const { settings } = req.body

    if (!settings || typeof settings !== 'object') {
      res.status(400).json({
        message: 'settings object is required',
      })
      return
    }

    const entries = Object.entries(settings)

    await Promise.all(
      entries.map(([key, value]) => runQuery(
        `
          INSERT INTO system_settings (setting_key, setting_value)
          VALUES (?, ?)
          ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value)
        `,
        [key, String(value)]
      ))
    )

    res.json({
      message: 'Settings updated successfully',
    })
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update settings',
      error: err.message,
    })
  }
})

/* REPORT SUMMARY */

app.get('/reports/summary', async (_req, res) => {
  try {
    const [farmerCountResult, cropCountResult, inventoryCountResult, requestCountResult, pendingRequestCountResult] = await Promise.all([
      runQuery('SELECT COUNT(*) AS total FROM farmers_report'),
      runQuery('SELECT COUNT(*) AS total FROM crops'),
      runQuery('SELECT COUNT(*) AS total FROM inventory'),
      runQuery('SELECT COUNT(*) AS total FROM service_requests'),
      runQuery("SELECT COUNT(*) AS total FROM service_requests WHERE status IN ('Pending', 'Under Review')"),
    ])

    const [latestFarmers, latestRequests] = await Promise.all([
      runQuery('SELECT * FROM farmers_report ORDER BY id DESC LIMIT 5'),
      runQuery('SELECT * FROM service_requests ORDER BY id DESC LIMIT 5'),
    ])

    res.json({
      summary: {
        totalFarmers: farmerCountResult[0]?.total || 0,
        totalCrops: cropCountResult[0]?.total || 0,
        totalInventoryItems: inventoryCountResult[0]?.total || 0,
        totalRequests: requestCountResult[0]?.total || 0,
        pendingOrReviewRequests: pendingRequestCountResult[0]?.total || 0,
      },
      latestFarmers,
      latestRequests,
    })
  } catch (err) {
    res.status(500).json({
      message: 'Failed to load reports summary',
      error: err.message,
    })
  }
})

/* SERVER */

app.listen(5000, () => {
  console.log('Server Running on Port 5000')
})