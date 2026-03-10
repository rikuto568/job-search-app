class PostsController < ApplicationController
  def index
    puts "=== デバッグ情報 ==="
    puts "params[:categories]: #{params[:categories]}"
    puts "params[:min_salary]: #{params[:min_salary]}"
    puts "====================="
    # データを取ってくるのがインデックス
    @posts = Post.all
    # 下の記述はカテゴリーを絞り込んでる
    if params[:categories].present? && params[:categories] != ""
      @posts = @posts.where(category: params[:categories])
    end
    if params[:min_salary].present?
      @posts = @posts.where.not(salary: nil)
      @posts = @posts.where("salary >= ?", params[:min_salary].to_i)
    end
    @posts = @posts.page(params[:page]).per(10)
    render json: {
      posts: @posts,
      current_page: @posts.current_page,
      total_pages: @posts.total_pages,
      total_count: @posts.total_count
    }
  end
  def create
    @post = Post.new(post_params)
  
    if @post.save
      render json: @post, status: :created
    else
      render json: { errors: @post.errors }, status: :unprocessable_entity
    end
  end
  # アクセスするURLによってアクションが変わる
  private

  def post_params
    params.require(:post).permit(:job_title, :salary, :category)
  end
end
