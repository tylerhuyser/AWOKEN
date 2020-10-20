class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :first_name
      t.string :last_name
      t.string :email
      t.date :date_of_birth
      t.boolean :admin
      t.references :company, null: false, foreign_key: true
      t.string :password_digest

      t.timestamps
    end
  end
end
