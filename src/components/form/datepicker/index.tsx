/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  FieldError,
  Group,
  Heading,
  Label,
  Popover,
  Text,
} from 'react-aria-components';
import { Controller, useFormContext } from 'react-hook-form';


interface ControlledDatePickerProps {
  name: string;
  label?: string;
  description?: string;
  rules?: any;
}

export function ControlledDatePicker({
  name,
  label,
  description,
  rules,
}: ControlledDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <DatePicker
          value={value}
          onChange={onChange}
          isInvalid={!!error}
          className="w-full"
        >
          <Label>{label}</Label>
          <Group className="border rounded px-2 py-1 flex gap-2">
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
            <Button>📅</Button>
          </Group>
          {description && (
            <Text slot="description" className="text-xs text-muted-foreground">
              {description}
            </Text>
          )}
          {error && (
            <FieldError className="text-sm text-red-500">
              {error.message}
            </FieldError>
          )}
          <Popover>
            <Dialog>
              <Calendar>
                <Button slot="previous">←</Button>
                <Heading />
                <Button slot="next">→</Button>
                <CalendarGrid>
                  <CalendarGridHeader>
                    {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
                  </CalendarGridHeader>
                  <CalendarGridBody>
                    {(date) => <CalendarCell date={date} />}
                  </CalendarGridBody>
                </CalendarGrid>
              </Calendar>
            </Dialog>
          </Popover>
        </DatePicker>
      )}
    />
  );
}
