class CreateSurveyFormats < ActiveRecord::Migration[6.0]
  def change
    create_table :survey_formats do |t|
      t.string :survey_name

      t.timestamps
    end
  end
end
