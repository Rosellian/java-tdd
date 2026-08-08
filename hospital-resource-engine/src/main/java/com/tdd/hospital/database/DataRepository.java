package com.tdd.hospital.database;

import org.springframework.jdbc.core.RowMapper;

import java.util.List;
import java.util.UUID;

public interface DataRepository<T> {
    RowMapper<DataList> listRowMapper = (rs, rowNum) -> new DataList(
            UUID.fromString(rs.getString("id")),
            rs.getString("name"),
            rs.getString("version")
    );

    List<DataList> getLists();

    List<T> getList(UUID listId);

    void saveList(DataList list, List<T> data);

    static String getListsQuery(String tableName) {
        return String.format("SELECT id, name, version FROM %s ORDER BY name", tableName);
    }

    static String getDataItemsQuery(String tableName) {
        return String.format("SELECT data FROM %s WHERE list_id = ?", tableName);
    }

    static String saveListQuery(String tableName) {
        return String.format("""
                INSERT INTO %s (id, name, version, created_at, updated_at)
                VALUES (?, ?, ?, NOW(), NOW())
                ON CONFLICT (id)
                DO UPDATE SET version = EXCLUDED.version,
                              updated_at = NOW()
            """, tableName);
    }

    static String deleteDataItemsQuery(String tableName) {
        return String.format("DELETE FROM %s WHERE list_id = ?", tableName);
    }

    static String saveDataItemQuery(String tableName) {
        return String.format("""
                INSERT INTO %s (id, list_id, data)
                VALUES (?, ?, ?)
            """, tableName);
    }

    static String getAllDataItemsQuery(String tableName) {
        return String.format("SELECT data FROM %s", tableName);
    }

    static String deleteDataItemQuery(String tableName) {
        return String.format("DELETE FROM %s WHERE id = ?", tableName);
    }
}