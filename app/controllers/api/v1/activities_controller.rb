class Api::V1::ActivitiesController < Api::V1::BaseController

  def index
    get_user
    activities = @user.sessions.where(template: false).select { |k,v| !%w(updated_at session_id heartrate calories template).include?(k) }
    render json: {sessions: activities}
  end

  def create
    get_user
    @activity = @user.sessions.create! post_params
    @activity.update_attributes! post_params
    if liftset_params.present?
      @update = liftset_params["liftsets"]
      @update.each do |liftset|
        set = @activity.liftsets.create! liftset.except :id
        # set.update_attributes liftset
      end
    end
    if @user.save
      render json: {message: "success", activity: @activity}
    end
  end

  def show
    @activity = Session.find(params[:id])
    render json: {activity: @activity, liftsets: @activity.liftsets}
  end

  def update
    session = post_params
    puts "&&&PARAMS"
    puts post_params
    puts liftset_params["liftsets"]
    @activity = Session.find session[:id]
    @activity[:completed_at] = DateTime.now
    puts @activity
    if liftset_params.present?
      @update = liftset_params["liftsets"]
      puts "**********************"
      puts @update
      puts "**********************"
      @update.each do |liftset|
        puts "**********************"
        puts liftset
        puts "**********************"
        set = Liftset.find liftset[:id]
        set.update_attributes! liftset
      end
    end
    if @activity.save
      render json: {message: "success", activity: @activity, liftsets: @activity.liftsets}
    else
      render json: {error: @activity.errors.full_messages}
    end
  end

  def destroy
    @activity = Session.find params[:id]
    @activity.destroy
    render json: {message: 'success'}
  end

  private

  def get_user

    @user = User.find params[:user_user_id]
  # if @user
  # else
  #   render json: @user.errors.full_messages
  end

  def post_params

    params.require(:session).permit(:id, :name, :user_id, :completed_at, :started_at)
  end

  def liftset_params
    params.permit(:liftsets => [:id, :session_id, :started, :stopped, :rest, :reps, :weight, :motion_id, :equipment_id])
  end

end
