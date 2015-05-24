class User < ActiveRecord::Base
  serialize :proof ,Hash
end
