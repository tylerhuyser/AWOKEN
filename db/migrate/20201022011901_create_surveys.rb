class CreateSurveys < ActiveRecord::Migration[6.0]
  def change
    create_table :surveys do |t|
      t.references :user, null: false, foreign_key: true
      t.references :survey_format, null: false, foreign_key: true
      t.integer :iteration

      t.timestamps
    end
  end
end
