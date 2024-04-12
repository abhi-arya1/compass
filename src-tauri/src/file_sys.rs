use std::fs;
use std::io;
use std::path::{Path, PathBuf};

/// Gets all the files and directories in the specified directory and separates them into two vectors.
///
/// # Arguments
///
/// * `dir_path_str` - A string slice that holds the path to the directory
///
/// # Returns
///
/// This function returns an `io::Result<(Vec<String>, Vec<String>)>`, where:
/// - The first `Vec<String>` contains paths to files.
/// - The second `Vec<String>` contains paths to directories.
/// - On error, an `io::Error` is returned.
pub fn get_directory_items(dir_path_str: &str) -> io::Result<(Vec<String>, Vec<String>)> {
    let dir_path = Path::new(dir_path_str);
    let mut files = Vec::new();
    let mut directories = Vec::new();

    let entries = fs::read_dir(dir_path)?;

    for entry in entries {
        let entry = entry?;
        let path = entry.path();

        if path.is_file() {
            if let Some(path_str) = path.to_str() {
                files.push(path_str.to_owned());
            } else {
                return Err(io::Error::new(
                    io::ErrorKind::InvalidData,
                    "Non-UTF8 file path encountered",
                ));
            }
        } else if path.is_dir() {
            if let Some(path_str) = path.to_str() {
                directories.push(path_str.to_owned());
            } else {
                return Err(io::Error::new(
                    io::ErrorKind::InvalidData,
                    "Non-UTF8 directory path encountered",
                ));
            }
        }
    }

    Ok((files, directories))
}
