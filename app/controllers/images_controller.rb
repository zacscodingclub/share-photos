class ImagesController < ApplicationController
  before_action :set_image, only: [:show, :edit, :update, :destroy]

  def index
  	@images = Image.all
  end

  def new
    @image = Image.new
  end

  def create
    @image = Image.new(image_params)
    @image.user = current_user

    if @image.save
      redirect_to @image, notice: "Image was successfully created."
    else
      render :new
    end
  end

  def show

  end

  def edit

  end

  def update

  end

  def destroy

  end

  private
    def image_params
      params.require(:image).permit(:name, :picture, :user_id)
    end

    def set_image
      @image ||= Image.find(params[:id])
    end
end
