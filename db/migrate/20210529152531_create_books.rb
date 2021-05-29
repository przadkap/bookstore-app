class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.integer :release_year
      t.integer :max_copies
      t.integer :available_copies

      t.timestamps
    end
  end
end
