class ChangeColumnReference < ActiveRecord::Migration[6.0]
  def change
    remove_column :surveys, :user_id
    add_reference :surveys, :employee, index: true
  end
end
