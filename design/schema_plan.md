# Schema Plan - FamilySync

## Overview
FamilySync requires a schema that supports multiple users belonging to a "Family" group. Data is shared within the family.

## Tables

### 1. `families`
Represents the core unit of the application. Users belong to a family.
- `id` (uuid, PK)
- `name` (text) - e.g., "The Smith Family"
- `created_at` (timestamp with time zone)
- `invite_code` (text, unique) - For easy sharing/joining (optional for MVP but good to plan)

### 2. `profiles`
Extends the default Supabase `auth.users` table.
- `id` (uuid, PK, FK -> auth.users.id)
- `family_id` (uuid, FK -> families.id, nullable initially) - A user might not join a family immediately, or creates one.
- `full_name` (text)
- `avatar_url` (text)
- `role` (text) - e.g., 'admin', 'member' (to manage family settings)
- `color` (text) - User's preferred color for their events on the calendar.
- `created_at` (timestamp)

### 3. `calendar_events`
The core calendar functionality.
- `id` (uuid, PK)
- `family_id` (uuid, FK -> families.id) - Events belong to the family.
- `created_by` (uuid, FK -> profiles.id)
- `title` (text)
- `description` (text)
- `start_time` (timestamp with time zone)
- `end_time` (timestamp with time zone)
- `is_all_day` (boolean)
- `color` (text) - Override user color or category color.
- `recurrence_rule` (text) - RRule string for recurring events.
- `location` (text)
- `created_at` (timestamp)

### 4. `event_assignees` (Join Table)
For assigning specific family members to an event (optional but useful for "Who is doing this?").
- `event_id` (uuid, FK -> calendar_events.id)
- `user_id` (uuid, FK -> profiles.id)
- Primary Key: (event_id, user_id)

### 5. `shopping_lists`
Shared lists for the family.
- `id` (uuid, PK)
- `family_id` (uuid, FK -> families.id)
- `name` (text) - e.g., "Groceries", "Hardware Store"
- `created_at` (timestamp)

### 6. `shopping_items`
Items within a list.
- `id` (uuid, PK)
- `list_id` (uuid, FK -> shopping_lists.id)
- `title` (text)
- `is_checked` (boolean)
- `added_by` (uuid, FK -> profiles.id)
- `created_at` (timestamp)

### 7. `todos`
Integrated to-do lists, distinct from calendar events (tasks vs time-bound).
- `id` (uuid, PK)
- `family_id` (uuid, FK -> families.id)
- `assigned_to` (uuid, FK -> profiles.id, nullable) - Can be unassigned or specific.
- `title` (text)
- `description` (text)
- `due_date` (timestamp, nullable)
- `is_completed` (boolean)
- `created_at` (timestamp)

## Relationships
- **One-to-Many**: Family -> Profiles
- **One-to-Many**: Family -> Calendar Events
- **One-to-Many**: Family -> Shopping Lists
- **One-to-Many**: Shopping List -> Shopping Items
- **One-to-Many**: Family -> Todos
- **Many-to-Many**: Calendar Events <-> Profiles (via `event_assignees`)

## Security Policies (RLS)
- All tables must have RLS enabled.
- **Select/Insert/Update/Delete**: Policies generally check `auth.uid()` against `profiles.id` and ensure the `family_id` matches the resource's `family_id`.
- Users can only access data belonging to their assigned `family_id`.
