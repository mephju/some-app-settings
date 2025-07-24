#!/bin/bash

# Check if an argument is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <branch-name>"
  exit 1
fi

branch_name="$1"

# Check if the branch name starts with a number followed by a dash
if [[ ! "$branch_name" =~ ^[0-9]+- ]]; then
  echo "Error: Branch name must start with a ticket number followed by a dash (e.g., 878-fix-bug)"
  exit 1
fi

# Extract the ticket number (digits before the first dash)
ticket_number=$(echo "$branch_name" | cut -d'-' -f1)

# Remove the ticket number and dash from the start
rest=$(echo "$branch_name" | sed -E "s/^$ticket_number-//")

# Replace dashes with spaces
rest_with_spaces=$(echo "$rest" | tr '-' ' ')

# Output final formatted string
echo "#$ticket_number $rest_with_spaces"
