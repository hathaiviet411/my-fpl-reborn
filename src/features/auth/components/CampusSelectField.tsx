import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AppPressable } from '@/src/components/ui/AppPressable';
import {
  CAMPUS_OPTIONS,
  getCampusLabel,
  type CampusOption,
} from '@/src/features/auth/constants/campusOptions';
import { colors } from '@/src/theme/colors';

const FIELD_HEIGHT = 46;
const SEARCH_HEIGHT = 44;
const LIST_MAX_HEIGHT = 200;

function normalizeSearchText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

type CampusSelectFieldProps = {
  value: CampusOption | null;
  onChange: (campus: CampusOption) => void;
};

export function CampusSelectField({ value, onChange }: CampusSelectFieldProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<TextInput>(null);

  const selectedLabel = useMemo(() => {
    if (!value) {
      return null;
    }

    return getCampusLabel(value, t);
  }, [t, value]);

  const filteredCampuses = useMemo(() => {
    const query = normalizeSearchText(searchQuery);

    if (!query) {
      return CAMPUS_OPTIONS;
    }

    return CAMPUS_OPTIONS.filter((campus) =>
      normalizeSearchText(getCampusLabel(campus, t)).includes(query),
    );
  }, [searchQuery, t]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSelect = (campus: CampusOption) => {
    onChange(campus);
    setIsOpen(false);
    setSearchQuery('');
  };

  const open = () => {
    setSearchQuery('');
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setSearchQuery('');
    searchInputRef.current?.blur();
  };

  const toggleOpen = () => {
    if (isOpen) {
      close();
      return;
    }

    open();
  };

  return (
    <View style={[styles.wrapper, isOpen && styles.wrapperOpen]}>
      <AppPressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        onPress={toggleOpen}
        style={[styles.field, isOpen && styles.fieldOpen]}
      >
        <Text
          numberOfLines={1}
          style={[styles.valueText, !selectedLabel && styles.placeholderText]}
        >
          {selectedLabel ?? t('auth.selectCampusPlaceholder')}
        </Text>

        <View style={styles.trailing}>
          <View style={styles.divider} />
          <Ionicons
            color={colors.grey}
            name={isOpen ? 'chevron-up' : 'business-outline'}
            size={18}
          />
        </View>
      </AppPressable>

      {isOpen ? (
        <>
          <AppPressable
            accessibilityLabel="Close campus list"
            accessibilityRole="button"
            disableFeedback
            onPress={close}
            style={styles.backdrop}
          />
          <View style={styles.dropdown}>
            <View style={styles.searchRow}>
              <Ionicons color={colors.grey} name="search" size={16} />
              <TextInput
                ref={searchInputRef}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setSearchQuery}
                placeholder={t('auth.searchCampusPlaceholder')}
                placeholderTextColor="#ACB5BB"
                style={styles.searchInput}
                value={searchQuery}
              />
              {searchQuery.length > 0 ? (
                <AppPressable
                  accessibilityLabel="Clear search"
                  hitSlop={8}
                  onPress={() => setSearchQuery('')}
                  style={styles.clearButton}
                >
                  <Ionicons color={colors.grey} name="close-circle" size={16} />
                </AppPressable>
              ) : null}
            </View>

            {filteredCampuses.length > 0 ? (
              <ScrollView
                bounces={false}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
                showsVerticalScrollIndicator
                style={styles.dropdownScroll}
              >
                {filteredCampuses.map((campus, index) => {
                  const isSelected = value?.id === campus.id;

                  return (
                    <AppPressable
                      key={campus.id}
                      accessibilityRole="menuitem"
                      onPress={() => handleSelect(campus)}
                      style={[
                        styles.option,
                        index > 0 && styles.optionBorder,
                        isSelected && styles.optionSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          isSelected && styles.optionTextSelected,
                        ]}
                      >
                        {getCampusLabel(campus, t)}
                      </Text>
                    </AppPressable>
                  );
                })}
              </ScrollView>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  {t('auth.searchCampusNoResults')}
                </Text>
              </View>
            )}
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
    height: FIELD_HEIGHT,
    zIndex: 1,
  },
  wrapperOpen: {
    zIndex: 30,
  },
  backdrop: {
    position: 'absolute',
    top: -400,
    right: -400,
    bottom: -400,
    left: -400,
    zIndex: 1,
  },
  field: {
    height: FIELD_HEIGHT,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.white,
    paddingLeft: 14,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#E4E5E7',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.24,
    shadowRadius: 2,
    elevation: 1,
    zIndex: 3,
  },
  fieldOpen: {
    borderColor: colors.primary,
  },
  valueText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.inputText,
    paddingRight: 8,
  },
  placeholderText: {
    color: '#ACB5BB',
  },
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 10,
  },
  divider: {
    width: 1,
    height: 22,
    backgroundColor: colors.stroke,
  },
  dropdown: {
    position: 'absolute',
    top: FIELD_HEIGHT + 6,
    left: 0,
    right: 0,
    zIndex: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.white,
    overflow: 'hidden',
    shadowColor: '#32343E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 8,
  },
  searchRow: {
    height: SEARCH_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.stroke,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.inputText,
    paddingVertical: 0,
  },
  clearButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownScroll: {
    maxHeight: LIST_MAX_HEIGHT,
  },
  option: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  optionBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.stroke,
  },
  optionSelected: {
    backgroundColor: colors.primaryMuted,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.inputText,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  emptyState: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  emptyStateText: {
    fontSize: 13,
    color: colors.grey,
    textAlign: 'center',
  },
});
