class ChangeUserToEmployee < ActiveRecord::Migration[6.0]
  def change
    rename_table :users, :employees
  end
end
