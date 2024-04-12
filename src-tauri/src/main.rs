// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod file_sys;
use file_sys::get_directory_items;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[tauri::command]
fn list_files_in_directory(path: String) -> Result<(Vec<String>, Vec<String>), String> {
    get_directory_items(&path).map_err(|e| e.to_string())
}

// use notify::{watcher, RecursiveMode, Watcher};
// use std::sync::mpsc::channel;
// use std::time::Duration;
// use tauri::AppHandle;

// fn start_file_watcher(app: AppHandle) {
//     let (tx, rx) = channel();

//     let mut watcher = watcher(tx, Duration::from_secs(10)).unwrap();
//     watcher
//         .watch("/path/to/watch", RecursiveMode::Recursive)
//         .unwrap();

//     std::thread::spawn(move || {
//         for event in rx {
//             match event {
//                 Ok(event) => {
//                     println!("{:?}", event);
//                 }
//                 Err(e) => println!("watch error: {:?}", e),
//             }
//         }
//     });
// }

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![list_files_in_directory, greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
