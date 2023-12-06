import praw
import os
import requests
from instagrapi import Client
from datetime import date
import subprocess
import json


def main():
    # Initialize new modules
    account_manager = AccountManager()
    customization_manager = CustomizationManager()
    engagement_enhancer = EngagementEnhancer()
    
    top_posts = redditAPI()
    for post in top_posts:
        if post.url.endswith('.jpg') or post.url.endswith('.png'):
            extension = '.jpg' if post.url.endswith('.jpg') else '.png'
            isDownloaded, image_path = download_image(post.url, extension)
            if isDownloaded:
                repo_url = 'https://raw.githubusercontent.com/abdulsamad4576/autogram'
                # Switch to the next available account using account_manager
                next_account_info = account_manager.get_next_account()
                access_token = next_account_info['access_token']
                ig_user_id = next_account_info['ig_user_id']
                image_filename = image_path.split('/')[-1]
                post_response = post_to_instagram(repo_url, image_filename, access_token, ig_user_id)
                print(post_response)
                break
                
def post_to_instagram(repo_url, image_filename, access_token, ig_user_id):
    image_url = f'{repo_url}/main/images/{image_filename}'

    post_url = f'https://graph.facebook.com/v10.0/{ig_user_id}/media'
    # Customize the post caption using the customization_manager
    customized_caption = customization_manager.customize_caption(str(date.today()))

    # Generate engagement prompts using the engagement_enhancer
    call_to_action = engagement_enhancer.generate_call_to_action()
    engagement_prompt = engagement_enhancer.prompt_user_interaction()

    # Create payload for the post with updated caption and engagement prompts
    payload = {
        'image_url': image_url,
        'caption': f"{customized_caption} {call_to_action} {engagement_prompt}",
        'access_token': access_token
    }
    response = requests.post(post_url, data=payload)
    result = json.loads(response.text)

    if 'id' in result:
        creation_id = result['id']
        publish_url = f'https://graph.facebook.com/v10.0/{ig_user_id}/media_publish'
        publish_payload = {
            'creation_id': creation_id,
            'access_token': access_token
        }
        publish_response = requests.post(publish_url, data=publish_payload)
        return json.loads(publish_response.text)
    else:
        return {'error': 'Failed to create post container'}
        
def redditAPI():
    reddit = praw.Reddit(client_id=os.environ.get('REDDIT_CLIENT_ID'),
                         client_secret=os.environ.get('REDDIT_CLIENT_SECRET'),
                         user_agent='topAPI')
    subreddit = reddit.subreddit('memes')
    return subreddit.top(time_filter='day', limit=20)

def download_image(url, extension):
    response = requests.get(url)
    if response.status_code == 200:
        image_name = get_image_name()
        image_path = f'./images/{image_name}{extension}'
        with open(image_path, 'wb') as file:
            file.write(response.content)
        increment_image_name()
        commit_and_push(image_name + extension)
        return True, image_path
    return False, None

def commit_and_push(filename):
    subprocess.run(['git', 'add', f'./images/{filename}'])
    subprocess.run(['git', 'commit', '-m', f'Add image {filename}'])
    subprocess.run(['git', 'push'])

def upload_to_instagram(image_path):
    insta = Client()
    insta.login(os.environ.get('INSTA_USERNAME'), os.environ.get('INSTA_PASSWORD'))
    caption = str(date.today())
    insta.photo_upload(image_path, caption)

def get_image_name():
    with open(f'./image_counter.txt', 'r') as file:
        number = int(file.read().strip())
    return f'image_{number}'

def increment_image_name():
    with open(f'./image_counter.txt', 'r') as file:
        number = int(file.read().strip())
    with open(f'./image_counter.txt', 'w') as file:
        file.write(str(number + 1))

if __name__ == '__main__':
    main()
