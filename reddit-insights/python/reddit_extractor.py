import urllib.request
import json
import time
import os

def fetch_reddit_posts(query_or_sub, is_subreddit=True, limit=100):
    """
    Busca posts recentes do Reddit utilizando a API pública em formato JSON.
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AntigravityRedditScript/1.0'
    }
    
    if is_subreddit:
        url = f"https://www.reddit.com/r/{query_or_sub}/new.json?limit={limit}"
    else:
        query_encoded = urllib.parse.quote(query_or_sub)
        url = f"https://www.reddit.com/search.json?q={query_encoded}&sort=new&limit={limit}"
        
    req = urllib.request.Request(url, headers=headers)
    
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            posts = []
            for child in data.get('data', {}).get('children', []):
                post = child.get('data', {})
                # Calcular pontuação de engajamento: Upvotes + (Comentários * 1.5) + (Ratio * 5)
                score = post.get('score', 0)
                comments = post.get('num_comments', 0)
                upvote_ratio = post.get('upvote_ratio', 1.0)
                engagement = score + (comments * 1.5) + (upvote_ratio * 5)
                
                posts.append({
                    'id': post.get('id'),
                    'title': post.get('title'),
                    'author': post.get('author'),
                    'subreddit': post.get('subreddit_name_prefixed', f"r/{query_or_sub}"),
                    'score': score,
                    'ups': post.get('ups', 0),
                    'comments': comments,
                    'upvote_ratio': upvote_ratio,
                    'engagement': round(engagement, 2),
                    'url': f"https://www.reddit.com{post.get('permalink', '')}",
                    'created_utc': post.get('created_utc'),
                    'selftext': post.get('selftext', '')[:300] + '...' if len(post.get('selftext', '')) > 300 else post.get('selftext', '')
                })
            return posts
    except Exception as e:
        print(f"Erro ao buscar posts para '{query_or_sub}': {e}")
        return []

def get_top_posts(posts, top_n=5):
    """
    Ordena posts por engajamento decrescente e retorna os Top N.
    """
    sorted_posts = sorted(posts, key=lambda x: x['engagement'], reverse=True)
    return sorted_posts[:top_n]

def save_to_json(data, filepath):
    """
    Salva os dados coletados em formato JSON estruturado.
    """
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"-> Dados salvos com sucesso em: {filepath}")

if __name__ == '__main__':
    print("==================================================")
    print("    REDDIT TECH INSIGHTS - EXTRATOR DE DADOS      ")
    print("==================================================")
    
    print("\n[1/2] Buscando posts recentes sobre 'n8n' (Subreddit r/n8n)...")
    n8n_posts = fetch_reddit_posts("n8n", is_subreddit=True, limit=100)
    top_n8n = get_top_posts(n8n_posts, 5)
    
    print(f"   -> Encontrados {len(n8n_posts)} posts de n8n.")
    print("\n--- TOP 5 POSTS DE n8n (Maior Engajamento) ---")
    for idx, p in enumerate(top_n8n, 1):
        print(f" {idx}. {p['title']}")
        print(f"    Link: {p['url']}")
        print(f"    Engajamento: {p['engagement']} (Ups: {p['ups']}, Comentários: {p['comments']}, Ratio: {p['upvote_ratio']})\n")
        
    time.sleep(1) # Respeitar rate limits do Reddit
    
    print("[2/2] Buscando posts recentes sobre 'Automação'...")
    automacao_posts = fetch_reddit_posts("automacao OR automation", is_subreddit=False, limit=100)
    top_automacao = get_top_posts(automacao_posts, 5)
    
    print(f"   -> Encontrados {len(automacao_posts)} posts de automação.")
    print("\n--- TOP 5 POSTS DE AUTOMAÇÃO (Maior Engajamento) ---")
    for idx, p in enumerate(top_automacao, 1):
        print(f" {idx}. {p['title']}")
        print(f"    Link: {p['url']}")
        print(f"    Engajamento: {p['engagement']} (Ups: {p['ups']}, Comentários: {p['comments']}, Ratio: {p['upvote_ratio']})\n")

    # Estruturação para eventual exportação JSON
    extracted_dataset = {
        'extracted_at': time.strftime('%Y-%m-%d %H:%M:%S'),
        'metrics': {
            'total_n8n_scraped': len(n8n_posts),
            'total_automacao_scraped': len(automacao_posts),
            'top_n8n_count': len(top_n8n),
            'top_automacao_count': len(top_automacao)
        },
        'top_n8n': top_n8n,
        'top_automacao': top_automacao
    }
    
    output_json_path = os.path.join(os.path.dirname(__file__), 'extracted_data.json')
    save_to_json(extracted_dataset, output_json_path)
    print("\n[OK] Processo de extração concluído com sucesso!")
