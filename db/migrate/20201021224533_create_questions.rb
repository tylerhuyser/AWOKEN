class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.string :question_format
      t.string :question_category
      t.string :question_copy
      t.references :survey_format, null: false, foreign_key: true

      t.timestamps
    end
  end
end
