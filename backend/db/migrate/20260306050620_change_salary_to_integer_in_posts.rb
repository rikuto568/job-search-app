class ChangeSalaryToIntegerInPosts < ActiveRecord::Migration[8.1]
  
  def up
    # 空文字をNULLにしてから integer に変換
    change_column :posts, :salary, "integer USING NULLIF(salary, '')::integer"
  end

  def down
    change_column :posts, :salary, :string
  end
end
