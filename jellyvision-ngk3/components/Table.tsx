// TableComponent.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

const MIN_CELL_WIDTH = 40; // Minimum width for a cell

const TableComponent = ({ data , columns, display }) => {
  const { width: screenWidth } = useWindowDimensions();

  const tableWidth = Math.max(screenWidth, columns.length * MIN_CELL_WIDTH);
  const columnWidth = tableWidth / columns.length;

  const renderHeader = () => (
    <View style={styles.headerRow}>
      {columns.map((column, index) => (
        <Text
          key={index}
          style={[styles.headerCell, { width: columnWidth }]}
          numberOfLines={1}
        >
          {column}
        </Text>
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      {columns.map((col, index) => (
        <Text
          key={index}
          style={[styles.cell, { width: columnWidth }]}
          numberOfLines={1}
        >
          {typeof display[col] === "function" ? display[col](item) : item[col]}
        </Text>
      ))}
    </View>
  );

  return (
    <ScrollView horizontal>
      <View style={{ width: tableWidth }}>
        {renderHeader()}
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          initialNumToRender={15}
          maxToRenderPerBatch={15}
          windowSize={10}
          removeClippedSubviews
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerCell: {
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cell: {
    padding: 10,
    textAlign: 'left',
  },
});

export default TableComponent;
