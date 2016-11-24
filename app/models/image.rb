class Image < ApplicationRecord
  belongs_to :user
  mount_uploader :picture, PictureUploader
  validates_presence_of :name, :picture
end
