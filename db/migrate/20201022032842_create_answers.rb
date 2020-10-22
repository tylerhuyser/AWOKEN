class CreateAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :answers do |t|
      t.references :employee, null: false, foreign_key: true
      t.references :survey, null: false, foreign_key: true
      t.references :question, null: false, foreign_key: true
      t.references :option, null: true, foreign_key: true
      t.text :free_response, null: true

      t.timestamps
    end
  end
end
