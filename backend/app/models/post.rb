class Post < ApplicationRecord
  # バリデーション前に給与を正規化する
  before_validation :normalize_salary

  validates :salary, presence: true, numericality: { only_integer: true, greater_than: 0 }
  
  enum :category, {
    "事務" => 0,
    "エンジニア" => 1,
    "営業" => 2,
    "デザイン" => 3,
    "マーケティング" => 4,
    "財務・経理" => 5,
    "人事" => 6,
    "カスタマーサポート" => 7,
    "製造" => 8,
    "医療・介護" => 9
  }

  private

  # 給与から数字以外の文字を取り除いて保存する処理
  def normalize_salary
    raw_salary = salary_before_type_cast.to_s
    return self.salary = nil if raw_salary.blank?

    s = raw_salary.tr('０-９', '0-9').gsub(/[^0-9]/, '')
    self.salary = s.present? ? s.to_i : nil
  end
end
