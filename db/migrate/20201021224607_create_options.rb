class CreateOptions < ActiveRecord::Migration[6.0]
  def change
    create_table :options do |t|
      t.integer :scoring_value
      t.string :option_copy
      t.references :question, null: false, foreign_key: true

      t.timestamps
    end
  end
end
