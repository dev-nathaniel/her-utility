import { Business } from '@/app/(businesses)/businesses';
import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    FlatList,
    LayoutRectangle,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View,
    findNodeHandle
} from 'react-native';
import { Portal } from 'react-native-paper';

export type CustomDropdownType = {
  title: string;
  value: any | null;
  onChange: (val: Business) => void;
  options: Business[];
  error?: any;
};

export default function CustomDropdown({ title, value, onChange, options, error }: CustomDropdownType) {
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  const wrapperRef = useRef(null);
  const dropdown = useRef(null)

  const measureLayout = () => {
    const handle = findNodeHandle(dropdown.current);
    if (!handle) return;

    UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      setLayout({ x: pageX, y: pageY, width, height });
    });
  };

  const toggleDropdown = () => {
    if (!open) measureLayout();
    setOpen(!open);
  };

  return (
    <>
    <View ref={dropdown} style={{ gap: 6 }}>
      {/* Label */}
      <Text style={styles.label}>{title}</Text>

      {/* Dropdown Trigger */}
      <TouchableOpacity
        ref={wrapperRef}
        onPress={toggleDropdown}
        activeOpacity={0.8}
        style={[
          styles.wrapper,
          open && { borderColor: Colors.light.tint },
          error && { borderColor: Colors.light.red },
        ]}
      >
        <Text
          style={[
            styles.valueText,
            { color: value ? Colors.light.text : '#A0A0A0' },
          ]}
        >
          {value?.name || `Select ${title}`}
        </Text>

        <AntDesign
          name={open ? 'up' : 'down'}
          size={20}
          color={Colors.light.tint}
        />
      </TouchableOpacity>

      {/* Error */}
      {/* <Text style={styles.error}>{error?.message}</Text> */}

      {/* ABSOLUTE DROPDOWN */}
      <Portal>
      {open && layout && (
        <View
          style={[
            styles.dropdown,
            {
              position: 'absolute',
              top: layout.height + layout.y + 4,
            //   top: layout.y + layout.height + 4,
              left: layout.x,
            //   left: layout.x,
              width: layout.width,
            },
          ]}
        >
          <FlatList
            data={options}
            style={{ maxHeight: 200 }} // 👈 FIXED HEIGHT + SCROLL
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  onChange(item);
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      </Portal>
    </View>

    {/* <Text style={styles.error}>Business is required</Text> */}
    {error && <Text style={styles.error}>{error.message}</Text>}

    </>
  );
}

const styles = StyleSheet.create({
  label: {
    color: Colors.light.tint,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
  },

  wrapper: {
    borderColor: '#D9D9D9',
    borderWidth: 1.5,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },

  valueText: {
    fontSize: 18,
    flex: 1,
  },

  dropdown: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    elevation: 5,
    zIndex: 9999,
    overflow: 'hidden',
  },

  option: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  optionText: {
    fontSize: 17,
  },

  error: {
    color: Colors.light.red,
    marginTop: 8,
    // marginBottom: 6
  },
});
