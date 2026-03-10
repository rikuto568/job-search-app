class ReplacePostColumnsForJob < ActiveRecord::Migration[8.1]
  def change
    remove_column :posts, :title, :string
    remove_column :posts, :content, :text

    add_column :posts, :job_title, :string
    add_column :posts, :salary, :string
    add_column :posts, :category, :integer
  end
end
